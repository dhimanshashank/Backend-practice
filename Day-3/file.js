const fs = require('fs');

fs.writeFile('async.txt', 'This is async write!', (err) => {
    if (err) {
        throw err;
    }
    console.log('Async file written');
});

fs.readFile('async.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('Async data in the file: ' + data);  
});

fs.appendFile('async.txt', 'This is async append!', (err) => {
    if (err) {
        throw err;
    }
    console.log('Async file appended');
})