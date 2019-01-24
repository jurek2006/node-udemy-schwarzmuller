const fs = require("fs");
const path = require("path");

// path.resolve("views", "add-product.html");
const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
);

const getDataFromFile = (filename, callback) => {
    // gets data from JSON file (in data folder)
    const filePath = path.join(
        path.dirname(process.mainModule.filename),
        "data",
        filename
    );
    fs.readFile(filePath, (err, fileData) => {
        if (!err) {
            callback(JSON.parse(fileData), filePath);
        } else {
            callback(null, filePath);
        }
    });
};

module.exports = class Cart {
    static addProduct(id, productPrice) {
        getDataFromFile("cart.json", (fileData, filePath) => {
            let cart = { products: [], totalPrice: 0 };
            // Fetch the previous cart
            if (fileData) {
                cart = fileData;
            }

            //  Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id
            );
            const existingProduct = cart.products[existingProductIndex];
            // Add new product/ increase quantity
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
};
