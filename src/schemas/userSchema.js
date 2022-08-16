const mongoose = require("mongoose");
require('mongoose-type-email');
const logger = require('../services/logger');
const MongoDBClient = require('../services/dbMongo');
const Schema = mongoose.Schema;
const usersCollection = 'users';

const usersSchema = new Schema({
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

class Users {
    users
    constructor() {
        MongoDBClient.getConnection();
        this.users = mongoose.model(usersCollection, usersSchema);
    }

    async getByEmail(email) {
        try {
            const response = await this.users.findOne({
                email: email
            })
            return response;
        } catch (error) {
            logger.error(error.message)
            throw new Error(`Error getting users: ${error.message}`)
        }
    }

    async postUser(user) {
        try {
            const response = await this.users.create(user)
            return response
        } catch (error) {
            logger.error(error.message)
            throw new Error(`Error creating user: ${error.message}`)
        }
    }
}

module.exports = new Users();