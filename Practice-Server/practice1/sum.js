const sumHandler = (req, res) => {
  console.log("In the sum handler!");
  const body = [];
  req.on("data", (chunk) => body.push(chunk));
  req.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const params = new URLSearchParams(parsedBody);
    const bodyObject = Object.fromEntries(params);
    const result = Number(bodyObject.num1) + Number(bodyObject.num2);
    console.log(result);
    res.setHeader("Content-Type", "text/html");
    res.write(`
            <h1>Result: ${result}</h1>
            <a href="/">Go to Home</a>
        `);
    return res.end();
  });
};

module.exports = sumHandler;
