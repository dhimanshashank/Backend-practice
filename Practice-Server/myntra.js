const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
        <h1>Welcome to Myntra Home</h1>`);
    return res.end();
  }
  else if (req.url === "/cart") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
        <h1>Welcome to Cart Section</h1>`);
    return res.end();
  }
  else if (req.url === "/men") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
        <h1>Welcome to Men Section</h1>`);
    return res.end();
  }
  else if (req.url === "/women") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
        <h1>Welcome to Women Section</h1>`);
    return res.end();
  }

  res.write(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Document</title>
        </head>
        <body>
            <h1>Welcome to Myntra</h1>
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/men">Men</a></li>
                    <li><a href="/women">Women</a></li>
                    <li><a href="/cart">Cart</a></li>
                </ul>
            </nav>
        </body>
    </html>
    `);
res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at the http://localhost:${PORT}`);
});
