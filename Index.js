const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');


//Launch Express
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// info to render views for the pages
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// Home Directory for SpaceX
app.get('/', (req, res) => {
    res.render('homepage')
});


//new error
app.all('*', (req, res, next) => {
    res.send("Page Not Found!!")
})

app.listen(3000, () => {
    console.log("√√√ Listening on Port 3000")
});