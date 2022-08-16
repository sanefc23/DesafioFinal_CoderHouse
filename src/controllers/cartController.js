const Cart = require('../models/Cart');
const CartAPI = require('../APIs/cartsAPI')
const UsersAPI = require('../APIs/usersAPI');
const sendEmail = require('../services/sendEmail');
const config = require('../config/config');
const logger = require('../services/logger');

const cartController = {
    create: async (req, res) => {
        if (req.session.passport != undefined) {
            const user = await UsersAPI.getByEmail(req.session.passport.user)
            let cart = new Cart();
            cart = {
                ...cart,
                email: user.email,
                adress: user.adress
            }
            cart.products.push(...req.body);
            CartAPI.create(cart)
                .then(created => {
                    logger.info('Creado carrido: ', cart)
                    res.cookie('userCart', JSON.stringify(created), {
                        maxAge: config.EXPIRATION
                    });
                    res.status(200).json(created);
                })
                .catch(e => {
                    logger.error(e);
                    res.json(e);
                });
        } else {
            res.status(400).json('Please log in first!')
        }
    },
    delete: (req, res) => {
        let id = req.params.id;
        CartAPI.deleteCart(id)
            .then(cart => {
                logger.info('Borrado carrito: ', cart)
                res.status(200).send('Carrito borrado.');
            })
            .catch(e => {
                logger.error(e);
                res.send(e);
            });
    },
    list: (req, res) => {
        CartAPI.listCartProducts(req.params._id)
            .then(cart => {
                res.status(200).json(cart);
            })
            .catch(e => {
                logger.error(e);
                res.json(e)
            });
    },
    addProd: (req, res) => {
        CartAPI.addToCart(
                req.params.cart_id, req.body)
            .then(() => {
                CartAPI.findById(req.params.cart_id)
                    .then(cart => {
                        res.cookie('userCart', JSON.stringify(cart), {
                            maxAge: 60 * 10000
                        });
                        res.status(200).json(cart);
                    })
                    .catch(e => {
                        logger.error(e);
                        res.json("Error deleting cart. ", e)
                    })
            })
            .catch(e => logger.error(e));
    },
    removeProd: (req, res) => {
        CartAPI.findById(req.params._id)
            .then(cart => {
                const updatedProducts = cart.products.filter(p => p.id_prod != req.params.id_prod)
                CartAPI.findByIdAndUpdate(req.params._id, updatedProducts)
                    .then(() => {
                        CartAPI.findById(req.params._id)
                            .then(cart => {
                                res.status(200).json(cart);
                            })
                            .catch(e => {
                                logger.error(e);
                                res.json("Error deleting product from cart. ", e)
                            })
                    })
                    .catch(e => {
                        logger.error(e);
                        res.json(e)
                    })
            })
    },
    checkout: (req, res) => {
        const cart = JSON.parse(req.cookies.userCart);
        UsersAPI.getByEmail(cart.user)
            .then(async userData => {
                const emailMessage = {
                    from: {
                        name: config.ETHEREAL_NAME,
                        address: config.ETHEREAL_EMAIL
                    },
                    to: config.ETHEREAL_EMAIL,
                    subject: `Recibimos tu orden #${cart._id}`,
                    html: `
                        <h1>Hola ${userData.name}! Recibimos correctamente tu orden #${cart._id}.</h1>
                        <p>Lo vas a estar recibiendo en tu domicilio ${userData.adress}.\nProductos:\n${cart.products.map(p => `${p.id_prod} x ${p.units}\n`)}</p>
                        `,
                }
                await sendEmail(emailMessage)
                res.status(200).json({
                    // whatsapp: content,
                    email: emailMessage
                })
            })
            .catch(e => {
                logger.error(e)
                res.status(500).json(e)
            });
    }
}

module.exports = cartController;