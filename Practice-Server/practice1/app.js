const http = require('http');
const userHandler = require('./user');

const server = http.createServer(userHandler);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})