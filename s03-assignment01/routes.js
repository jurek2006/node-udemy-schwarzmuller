const requestHandler = (req, res) => {
    const { url, method } = req;

    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>Hello</title></head>");
        res.write("<body>");
        res.write("<h1>Hello Word!</h1>");
        res.write('<form action="/username" method="POST" >');
        res.write('<input type="text" name="username">');
        res.write('<button type="submit">Send</button>');
        res.write("</form>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    } else if (url === "/users") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>Users</title></head>");
        res.write("<body><ul>");
        res.write("<li>User 1</li>");
        res.write("<li>User 2</li>");
        res.write("<li>User 3</li>");
        res.write("<ul></body>");
        res.write("</html>");
        return res.end();
    } else if (url === "/username" && method === "POST") {
        const body = [];
        req.on("data", chunk => {
            body.push(chunk);
        });
        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split("=")[1];
            console.log(username);
            res.setHeader("Content-Type", "text/html");
            res.write("<html>");
            res.write("<head><title>Users</title></head>");
            res.write("<body>");
            res.write(`<p>Username: ${username}</p>`);
            res.write("</body>");
            res.write("</html>");
            return res.end();
        });
    } else {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>Users</title></head>");
        res.write("<body>");
        res.write(`<p>Page not found</p>`);
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
};

module.exports = { requestHandler };
