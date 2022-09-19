const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const app = express();
const dishRouter = require('./public/routes/dishRouter')
const promoRouter = require('./public/routes/promoRouter')
const leaderRouter = require('./public/routes/leaderRouter')
const mongoose = require('mongoose'); 
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db)=>{
    console.log("Connected correctly to the server");
}, (err) => { console.log(err) })

const hostname = 'localhost';
const port = 3000;

app.use(morgan('dev'));
dishRouter.use(bodyParser.json());

app.use('/dishes', dishRouter)
app.use('/promotions', promoRouter)
app.use('/leaders', leaderRouter)

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'Text/Html');
    res.end('<html><body><h1>This is Index</h1></body></html>')
})
const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at the http://${hostname}:${port}`);
})
