const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const notFound404controller = require("./controllers/notFound404");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(notFound404controller);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
