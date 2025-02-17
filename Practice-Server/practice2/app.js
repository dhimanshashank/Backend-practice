const express = require('express');

const app = express();

// Adding multiple middlewares using app.use()
app.use('/', (req, res, next) => {
    console.log('Middleware 1 called', req.url, req.method);
    next();
})
// next helps us to navigate from one middleware to another

app.use('/', (req, res, next) => {
    console.log('Middleware 2 called', req.url, req.method);
    next();
});


//  We need to comment this out as whenever the middleware is called, the response is sent and hence we cannot access the next middleware

app.get('/', (req, res, next) => {
    console.log('Middleware 3 called', req.url, req.method);
    res.send(`
        <h1>Welcome to the Home Page</h1>
        <a href='/contactus'>Contact Us</a>
        `);
    // once the response is sent, the middleware chain is broken
})

app.get('/contactus',(req, res, next) => {
    console.log('Contact us middleware called for GET', req.url, req.method);
    res.send(`
        <h1>Welcome to the Contact Us Page</h1>
        <form action='/contactus' method='POST'>
            <label for='name'>Name: </label>
            <input type='text' name='name' placeholder='Enter your Name'>
            <label for='email'>Email: </label>
            <input type='email' name='email' placeholder='Enter your Email'>
            
            <button type='submit'>Submit</button>
        </form>
        `);
})

app.post('/contactus',(req, res, next) => {
    console.log('Contact us middleware called for POST', req.url, req.method);
    res.send(`
        <h2>Thanks for your response!</h2>
        <p>We'll contact you shortly 👍 </p>
        `);
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})