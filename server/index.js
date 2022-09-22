console.log("Implement servermu disini yak 😝!");
const express = require('express');
const expressEjs = require('express-ejs-layouts');
const userController = require('./controller/userController');
const explorerController = require('./controller/explorerController');
const { json } = require('express');


const app = express();

// use ejs in app.set() to setup ejs view engine
app.set('view engine', 'ejs');

// use app.use() express ejs to setup package ejs layouting
app.use(expressEjs);

// set route for public static file
app.use(express.static('public'));

app.get('/', (req, res) => {
    // Mengarah ke dashboard
    userController.homepage(res);
})

app.get('/cars', (req, res) => {
    // Mengarah ke halaman pencarian
    userController.explore(res);
})

app.post('/cars/:driverType/:date/:time/:countPeople', (req, res) => {
    // Metode AJAX untuk mendapat JSON filter
    res.send(JSON.stringify(explorerController.filterData(req.params.driverType, req.params.date, req.params.time, req.params.countPeople)));
});

app.listen(3000);