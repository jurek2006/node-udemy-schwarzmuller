const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    const product = new Product(null, title, imageUrl, price, description);
    product.save(() => {
        res.redirect("/admin/products");
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect("/");
        }
        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            editing: editMode,
            product: product
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const { productId, title, imageUrl, price, description } = req.body;
    const updatedProduct = new Product(
        productId,
        title,
        imageUrl,
        price,
        description
    );
    updatedProduct.save(() => {
        res.redirect("/admin/products");
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const { productId } = req.body;
    Product.deleteById(productId, () => {
        res.redirect("/admin/products");
    });
};

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "All Admin products"
        });
    });
};
