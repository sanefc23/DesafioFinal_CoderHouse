const ProductsAPI = require('../APIs/productsAPI');
const Product = require('../models/Product');
const logger = require('../services/logger');

const productController = {
    getProducts: (req, res) => {
        const id = req.params._id;
        if (!id) {
            ProductsAPI.getProducts()
                .then(products => {
                    res.status(200).json(products);
                })
                .catch(e => {
                    logger.error(e);
                    res.json(e);
                })
        } else {
            ProductsAPI.getProductByID(req.params._id).then(prod => {
                if (prod) {
                    res.status(200).json(prod);
                } else {
                    res.status(200).json('Producto no encontrado.');
                }
            }).catch(e => {
                logger.error(e);
                res.status(500).json(e);
            })
        }
    },
    insertProduct: (req, res) => {
        let newProd = new Product();
        newProd = {
            ...newProd,
            ...req.body
        };
        ProductsAPI.addProduct(newProd)
            .then(() => {
                logger.info('Producto creado')
                res.redirect('/api/products')
            })
            .catch(e => {
                logger.error(e);
                res.json(e);
            });
    },
    updateProduct: (req, res) => {
        const updatedProd = {
            ...req.body
        };
        ProductsAPI.updateProduct(req.params._id, updatedProd)
            .then(prod => {
                logger.info('Producto actualizado')
                res.redirect('/api/products')
            })
            .catch(e => {
                logger.error(e);
                res.json(e);
            });
    },
    deleteProduct: (req, res) => {
        ProductsAPI.deleteProduct(req.params._id)
            .then(prod => {
                logger.info('Producto eliminado')
                res.redirect('/api/products');
            })
            .catch(e => {
                res.send("Error deleting product. ", e)
            });
    }
}

module.exports = productController;