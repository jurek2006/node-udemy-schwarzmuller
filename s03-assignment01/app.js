const http = require("http");
const routes = require("./routes");

const server = http.createServer(routes.requestHandler);
server.listen(3000, () => {
    console.log("Server started on port 3000");
});
