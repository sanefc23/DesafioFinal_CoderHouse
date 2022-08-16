class Product {
    constructor(
        name,
        description,
        code,
        image,
        price,
        stock
    ) {
        this.name = name;
        this.description = description;
        this.code = code;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.timestamp = Date.now();
    }
}

module.exports = Product;