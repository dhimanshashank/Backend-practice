const express = require('express');
const homeRouter = require('./routes/homeRouter');
const contactRouter = require('./routes/contactRouter');

const app = express();

app.use(express.urlencoded())

app.use("/", homeRouter);
app.use('/contact-us', contactRouter);

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})