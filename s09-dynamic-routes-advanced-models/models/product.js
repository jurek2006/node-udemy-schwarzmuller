const fs = require("fs");
const path = require("path");

const { getDataFromFile } = require("../utils/fileUtils");

const getProductsFromFile = cb => {
    getDataFromFile("products.json", (fileData, filePath) => {
        if (!fileData) {
            return cb([]);
        }
        cb(fileData, filePath);
    });
};

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile((products, filePath) => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
};
