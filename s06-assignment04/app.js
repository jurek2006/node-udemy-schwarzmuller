const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

const routes = require("./routes/routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.use((req, res, next) => {
    res.status(404).render("404", { pageTitle: "Nie znaleziono strony" });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
