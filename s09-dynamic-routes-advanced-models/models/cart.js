const fs = require("fs");
const path = require("path");

// path.resolve("views", "add-product.html");
const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product
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

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // delete product from cart if it's there
            const existingProduct = cart.products.find(prod => prod.id === id);
            if (existingProduct) {
                // subtract products' value from totalPrice
                const updatedTotalPrice =
                    cart.totalPrice - existingProduct.qty * productPrice;

                // save products in cart without existingProduct
                const updatedProducts = cart.products.filter(
                    prod => prod !== existingProduct
                );
                const updatedCart = {
                    products: updatedProducts,
                    totalPrice: updatedTotalPrice
                };

                fs.writeFile(p, JSON.stringify(updatedCart), err => {
                    console.log(err);
                });
            }
        });
    }
};
