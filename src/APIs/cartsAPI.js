const Carts = require('../schemas/cartSchema');

const CartsAPI = {
  create: async (cart) => await Carts.create(cart),
  findById: async (id) => Carts.findById(id),
  deleteCart: async (id) => await Carts.delete(id),
  listCartProducts: async (id) => await Carts.listProducts(id),
  addToCart: async (id, prod) => await Carts.addToCart(id, prod),
  findByIdAndUpdate: async (id, prod) => await Carts.findByIdAndUpdate(id, prod)
}

module.exports = CartsAPI