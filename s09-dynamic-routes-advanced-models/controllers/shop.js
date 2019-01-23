const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All products"
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render("shop/product-detail", {
            pageTitle: product.title,
            product,
            path: "/products"
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
        pageTitle: "Your Cart"
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        pageTitle: "Your Orders"
    });
};

exports.getIndex = (req, res, next) => {
    // console.log(locals.path);
    Product.fetchAll(products => {
        res.render("shop/index", {
            prods: products,
            pageTitle: "Shop"
        });
    });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout"
    });
};
