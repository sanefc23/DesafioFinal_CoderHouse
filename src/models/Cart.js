class Cart {
    constructor() {
        this.timestamp = Date.now();
        this.products = [];
        this.user;
    }
}

module.exports = Cart;