// This represents the structure of a product
class Product {
    constructor(id, name, price, type, faceShapes, image, available) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.faceShapes = faceShapes;
        this.image = image;
        this.available = available;
    }
}

module.exports = Product;
