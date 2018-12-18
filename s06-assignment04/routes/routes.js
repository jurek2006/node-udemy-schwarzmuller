const express = require("express");

const router = express.Router();

const users = [];

router.get("/", (req, res, next) => {
    res.render("index", { pageTitle: "Dodaj użytkownika", path: "/" });
});

router.post("/", (req, res, next) => {
    users.push({ username: req.body.username });
    console.log(users);
    res.redirect("/users");
});

router.get("/users", (req, res, next) => {
    res.render("users", {
        users: users,
        pageTitle: "Użytkownicy",
        path: "/users"
    });
});

module.exports = router;
