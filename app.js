const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config()

mongoose.connect(process.env.MONGODB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB database connected successfully"))
.catch(console.log);

const app = express();

// Middlewares
app.use(morgan('dev'));
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// importing routes
const userRoutes = require('./routes/userRoutes');
const quizzesRoutes = require('./routes/quizzesRoutes');
const flashcardsRoutes = require('./routes/flashcardsRoutes');

// Routes
app.use('/', userRoutes);
app.use('/quizzes', quizzesRoutes);
app.use('/flash-cards', flashcardsRoutes);

app.listen(process.env.PORT, () =>{
  console.log(`Server running on port ${process.env.PORT}`);
});
