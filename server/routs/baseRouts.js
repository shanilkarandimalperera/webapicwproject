var express = require('express');
const app = express();
var router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');
const csvToJson = require('convert-csv-to-json');
const session = require('express-session');
const fs = require('fs');
const mongoose = require('mongoose')


app.set('view engine', 'ejs');
app.use(express.json());


mongoose.connect('mongodb+srv://apiwebcw:W4ZPk1AWIGmrR8zZ@holidaycentral.7bwifhs.mongodb.net/HolidayCentral', { useNewUrlParser: true })
    .then(() => console.log('Connected!')).catch((err) => console.log("Something wrong", err));

var reservationschema = mongoose.Schema({
    hotelname: String,
    location: String
})

var reservationschemas = mongoose.model("hotelreservations", reservationschema);


async function getReservation(req) {
    let u = await reservationschemas.find({ $and: [{ location: req.query.txtdestini }, { $or: [{ starrating: parseInt(req.query.txtrating) }] }] });
    console.log(u);
    console.log(req.query.txtrating);
    console.log(req.query.txtdestini);
    return u;
}

// async function getReservation() {
//     let u = await reservationschemas.find({});
//     return u;
// }

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//router.use(session({ secret: "The Secret!" }));

router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../views/index.html'));
});

router.get('/search', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../views/search.html'));
});


// router.post('/reservation', async(req, res) => {
//     let result = await getReservation(req);
//     res.send(result);
// });


router.get('/reservation', async(req, res) => {
    let result = await getReservation(req);
    res.json(result);
});

module.exports = router;