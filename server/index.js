const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');

const baseRouts = require('./routs/baseRouts.js');

app.use('/', baseRouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(session({ secret: "The Secret!" }));

//app.use(cookieParser());



app.listen(8080)