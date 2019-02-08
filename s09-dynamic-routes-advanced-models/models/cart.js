const fs = require("fs");
const path = require("path");

const getCartFilePath = () => {
    // return path to file storing cart
    return path.join(
        path.dirname(process.mainModule.filename),
        "data",
        "cart.json"
    );
};

const fetchCart = () => {
    return new Promise((resolve, reject) => {
        // fetches cart from file, if got error gives empty cart
        fs.readFile(getCartFilePath(), (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                try {
                    cart = JSON.parse(fileContent);
                } catch (err) {
                    console.log(
                        `Can't properly parse ${getCartFilePath()} file. Empty cart resolved instead`
                    );
                }
            }
            resolve(cart);
        });
    });
};

const saveCart = cart => {
    fs.writeFile(getCartFilePath(), JSON.stringify(cart), err => {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = class Cart {
    static async addProduct(id, productPrice) {
        try {
            // Fetch the previous cart
            const cart = await fetchCart();

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
            await saveCart(cart);
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteProduct(id, productPrice) {
        try {
            // Fetch the previous cart
            const cart = await fetchCart();

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
                await saveCart(updatedCart);
            }
        } catch (err) {
            console.log(err);
        }
    }
};
