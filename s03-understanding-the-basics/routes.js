const fs = require("fs");

const requestHandler = (req, res) => {
    const { url, method } = req;
    res.setHeader("Content-Type", "text/html");
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter message</title></head>");
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        res.write("</html>");
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", chunk => {
            body.push(chunk);
        });
        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile("message.txt", message, err => {
                if (err) {
                    console.log(err);
                }
            });
        });
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
    }

    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello from nodeJS server</h1></body>");
    res.write("</html>");
    return res.end();
};

module.exports = {
    handler: requestHandler
};
