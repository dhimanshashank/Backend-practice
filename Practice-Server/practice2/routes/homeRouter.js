const express = require('express');
const path = require('path');

const homeRouter = express.Router();
const rootDir = require('../utils/pathUtil');

homeRouter.get('/', (req, res) => {
    res.status(200).sendFile(path.join(rootDir, 'views', 'home.html'));
});

module.exports = homeRouter;