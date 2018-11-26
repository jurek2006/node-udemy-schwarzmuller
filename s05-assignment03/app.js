const path = require("path");
const express = require("express");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
    res.sendFile(path.resolve("views", "index.html"));
});

app.get("/users", (req, res, next) => {
    res.sendFile(path.resolve("views", "users.html"));
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
