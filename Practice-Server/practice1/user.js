const sumHandler = require('./sum');

const userHandler = (req, res) => {
    console.log(req.url, req.method);
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Welcome to the Calculator App</h1>
    <p><a href='/calculator'>Calculator</a></p>
</body>
</html>
        `);
        return res.end();
    } else if (req.url.toLowerCase() === '/calculator') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Welcome to the Calculator App</h1>
        <form action="/calculate-result" method="POST">
            <input type="number" name="num1" placeholder="Enter first number">
            <input type="number" name="num2" placeholder="Enter second number">
            <button type="submit">Calculate</button>
        </form>
    </body>
    </html>
            `);
        return res.end();
    } else if (req.url.toLowerCase() === '/calculate-result' && req.method == 'POST') {
        return sumHandler(req, res);
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <h1>404 Page Not Found</h1>
            <a href="/">Go to Home</a>
        `);
        return res.end();
    }
};

module.exports = userHandler;
