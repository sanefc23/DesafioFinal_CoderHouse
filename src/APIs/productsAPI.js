const Products = require('../schemas/productSchema');

const ProductsAPI = {
  getProducts: async () => await Products.getProducts(),
  getProductByID: async (id) => await Products.getById(id),
  addProduct: async (prod) => await Products.insertProduct(prod),
  updateProduct: async (id, prod) => await Products.updateProduct(id, prod),
  deleteProduct: async (id) => await Products.deleteProduct(id)
}

module.exports = ProductsAPI