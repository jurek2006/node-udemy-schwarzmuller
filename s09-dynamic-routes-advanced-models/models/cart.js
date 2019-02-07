const fs = require("fs");
const path = require("path");

const fetchCart = callback => {
    // creates path to cart.json storing cart
    const p = path.join(
        path.dirname(process.mainModule.filename),
        "data",
        "cart.json"
    );

    // fetches cart from file, if got error gives empty cart
    fs.readFile(p, (err, fileContent) => {
        let cart = { products: [], totalPrice: 0 };
        if (!err) {
            cart = JSON.parse(fileContent);
        }
        callback(cart, p);
    });
};

const saveCart = (cart, p) => {
    fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fetchCart((cart, p) => {
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
            // Save cart to the cart file
            saveCart(cart, p);
        });
    }

    static deleteProduct(id, productPrice) {
        fetchCart((cart, p) => {
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

                // Save cart to the cart file
                saveCart(updatedCart, p);
            }
        });
    }
};
