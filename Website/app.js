var express = require('express');
var path = require('path');
var hostname = 'localhost';
var port = 3000;
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {

    res.render('home.html');
})

app.get('/about', (req, res) => {

    res.render('about.html');
})

app.get('/contact', (req, res) => {
    res.render('contact.html');
})
app.post('/contact', (req, res) => {
    console.log(req.body)

    res.redirect('/')
})

app.get('/projects', async(req, res) => {

    res.render('projects.html');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://localhost:${port}/`);
});