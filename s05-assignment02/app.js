const express = require("express");

const app = express();
app.use("/users", (req, res) => {
    console.log("first middleware");
    res.json({ user: "Jurek" });
});
app.use("/", (req, res) => {
    console.log("second middleware");
    res.send("ok");
});

app.listen(3000);
