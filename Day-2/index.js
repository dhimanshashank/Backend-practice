const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user = { email, password };
    const filePath = path.join(__dirname, 'data.json');
    
    fs.readFile(filePath, (err, data) => {
        let users = [];
        if (!err) {
            users = JSON.parse(data);
        }
        users.push(user);
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

app.get('/users', (req, res) => {
    const filePath = path.join(__dirname, 'users.json');
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading users' });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
