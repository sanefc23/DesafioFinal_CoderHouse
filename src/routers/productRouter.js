const express = require('express');
const productRouter = express.Router();
const productController = require("../controllers/productController");
const validateAdmin = require('../middlewares/validateAdmin');

productRouter.get('/:_id?', productController.getProducts);
productRouter.post('/', validateAdmin, productController.insertProduct); //admin
productRouter.put('/:_id', validateAdmin, productController.updateProduct); //admin
productRouter.delete('/:_id', validateAdmin, productController.deleteProduct); //admin

module.exports = productRouter;