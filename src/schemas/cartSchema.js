const mongoose = require("mongoose");
const logger = require('../services/logger');
const MongoDBClient = require('../services/dbMongo');
const Schema = mongoose.Schema;
const cartsCollection = 'cart';

const cartSchema = new Schema({
    timestamp: Date,
    products: [{
        id_prod: String,
        units: Number
    }, ],
    user: String
});

class Carts {
    carts
    constructor() {
        MongoDBClient.getConnection();
        this.carts = mongoose.model(cartsCollection, cartSchema);
    }
    async create(cart) {
        try {
            const response = await this.carts.create(cart)
            return response
        } catch (e) {
            logger.error(e.message)
            throw new Error(e.message)
        }
    }
    async findById(id) {
        try {
            const response = await this.carts.findById(id).lean()
            return response
        } catch (e) {
            logger.error(e.message)
            throw new Error(e.message)
        }
    }
    async delete(id) {
        try {
            const response = await this.carts.findByIdAndDelete(id)
            return response
        } catch (e) {
            logger.error(e.message)
            throw new Error(e.message)
        }
    }
    async listProducts(id) {
        try {
            const response = await this.carts.findById(id);
            return response.products
        } catch (e) {
            logger.error(e.message)
            throw new Error(e.message)
        }
    }
    async addToCart(id, prod) {
        try {
            const response = await this.carts.findByIdAndUpdate(id, {
                $push: {
                    "products": {
                        ...prod
                    }
                }
            }, {
                safe: true,
                upsert: true
            });
            return response.products
        } catch (e) {
            logger.error(e.message)
            throw new Error(e.message)
        }
    }
    async findByIdAndUpdate(id, updatedProds) {
        try {
            const response = await this.carts.findByIdAndUpdate(id, {
                "products": updatedProds
            }, {
                safe: true
            })
            return response
        } catch (e) {
            logger.error(e.message)
            throw new Error(e.message)
        }
    }
}

module.exports = new Carts()