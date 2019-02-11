const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(callback) {
        getProductsFromFile(products => {
            if (this.id) {
                // update existing product
                const updatedProducts = products.map(prod =>
                    prod.id === this.id ? this : prod
                );
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    if (err) {
                        console.log(err);
                    }
                    callback();
                });
            } else {
                // save new product
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    if (err) {
                        console.log(err);
                    }
                    callback();
                });
            }
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

    static deleteById(id, callback) {
        getProductsFromFile(products => {
            // get deleting product price because is needed to delete product from cart properly
            const productPrice = products.find(product => product.id === id)
                .price;
            const updatedProducts = products.filter(
                product => product.id !== id
            );
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, productPrice);
                    callback();
                } else {
                    console.log(err);
                }
            });
        });
    }
};
