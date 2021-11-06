var express = require("express");
var morgan = require("morgan");
var mongoose = require('mongoose');
var dotenv = require("dotenv");

dotenv.config()

var app = express();

// Middlewares
app.use(morgan('dev'));
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// importing routes
const userRoutes = require('./routes/userRoutes');

// Routes
app.use('/', userRoutes);

app.listen(process.env.PORT,() =>{
    console.log(`Server running on port  ${process.env.PORT}`) 
 } )