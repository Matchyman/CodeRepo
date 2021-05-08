var express = require('express');
var path = require('path');
var hostname = '127.0.0.1';
var port = 3000;
var app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);


app.get('/', (req, res) => {

    res.render('home.html');
})





app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});