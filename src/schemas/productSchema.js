const mongoose = require("mongoose");
const logger = require('../services/logger');
const MongoDBClient = require('../services/dbMongo');
const Schema = mongoose.Schema;
const productsCollection = 'products';

const productSchema = new Schema({
	name: {
		type: String,
		unique: true,
	},
	description: String,
	code: String,
	image: String,
	price: Number,
	stock: Number,
	category: String,
	timestamp: Date,
});

class Products {
	products
	constructor() {
		MongoDBClient.getConnection();
		this.products = mongoose.model(productsCollection, productSchema);
	}
	async getProducts() {
		try {
			const response = await this.products.find().sort({
				'_id': 1
			}).lean()
			return response;
		} catch (e) {
			logger.error(e.message)
			throw new Error(e.message)
		}
	}
	async getById(id) {
		try {
			const response = await this.products.findById(id).lean();
			return response
		} catch (e) {
			logger.error(e.message)
			throw new Error(`Error getting products: ${e.message}`)
		}
	}
	async insertProduct(prod) {
		try {
			const response = await this.products.create(prod);
			return response
		} catch (e) {
			logger.error(e.message)
			throw new Error(`Error inserting product: ${e.message}`)
		}
	}
	async updateProduct(id, product) {
		try {
			const response = await this.products.findByIdAndUpdate(id, product);
			logger.info('producto actualizado: ', product);
			return response;
		} catch (e) {
			logger.error('Error en Update producto: ', e);
		}
	}
	async deleteProduct(id) {
		try {
			const response = await this.products.findByIdAndDelete(id);
			logger.warn('producto eliminado: ', id);
			return response;
		} catch (e) {
			logger.error('Error en Delete producto: ', e);
		}
	}
}

module.exports = new Products()