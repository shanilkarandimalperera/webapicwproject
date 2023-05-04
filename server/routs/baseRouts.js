var express = require('express');
const app = express();
var router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')


app.set('view engine', 'ejs');
app.use(express.json());


mongoose.connect('mongodb+srv://apiwebcw:W4ZPk1AWIGmrR8zZ@holidaycentral.7bwifhs.mongodb.net/HolidayCentral', { useNewUrlParser: true })
    .then(() => console.log('Connected!')).catch((err) => console.log("Something wrong", err));

var reservationschema = mongoose.Schema({
    hotelname: String,
    location: String
})

var customerhotelrsv = mongoose.Schema({
    hotelreference: String,
    hotelname: String,
    customername: String,
    cusomercontact: Number,
    checkindate: String,
    checkoutdate: String,
    numdays: String,
    numrooms: String,
    boardbasis: String,
    priceperroom: String,
    totalprice: String

})

var reservationschemas = mongoose.model("hotelreservations", reservationschema);

var customerhotelrsvs = mongoose.model("hotelrsvcustomers", customerhotelrsv);


async function createRsv(req) {

    try {
        let newRsv = new customerhotelrsvs({
            hotelreference: req.body.hotelreference,
            hotelname: req.body.hotelname,
            customername: req.body.customername,
            cusomercontact: req.body.cusomercontact,
            checkindate: req.body.checkindate,
            checkoutdate: req.body.checkoutdate,
            numdays: req.body.numdays,
            numrooms: req.body.numrooms,
            boardbasis: req.body.boardbasis,
            priceperroom: req.body.priceperroom,
            totalprice: req.body.totalprice
        });

        const result = await newRsv.save();
        console.log("result-->", result);
    } catch (error) {
        console.log("error-->", error);
    }
}

async function getCustomerRsv(req) {
    let result = await customerhotelrsvs.find({ hotelreference: req.query.hotelreference })
    return result
}


async function getReservation(req) {
    let result = await reservationschemas.find({ location: req.query.txtdestini });
    console.log(result);
    console.log(req.query.txtdestini);
    return result;
}


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../views/index.html'));
});

router.get('/search', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../views/search.html'));
});




router.get('/reservation', async(req, res) => {
    let result = await getReservation(req);
    res.json(result);
});

router.get('/getReservations', async(req, res) => {
    try {
        const result = await getCustomerRsv(req);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/checkout', async function(req, res) {
    try {
        let r = await createRsv(req);
        res.send(r);
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: "An error occurred while creating the reservation." });
    }
});


module.exports = router;