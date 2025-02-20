const express = require('express');
const path = require('path');

const contactRouter = express.Router();
const rootDir = require('../utils/pathUtil');

contactRouter.get('/', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views', 'contact-us.html'));
});

contactRouter.post('/', (req, res, next) => {
    console.log(req.body);
    res.status(200).sendFile(path.join(rootDir, 'views', 'contact-success.html'));
})

module.exports = contactRouter;