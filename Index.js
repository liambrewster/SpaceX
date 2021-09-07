const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const idPlugin = require('mongoose-id');

//Routes
const launchRoutes = require('./routes/launches');

//connect to Mongo DB
mongoose.connect('mongodb://localhost:27017/spacex', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("√√√ Database Connected");
});

//Launch Express
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// info to render views for the pages
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use('/launch', launchRoutes)


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