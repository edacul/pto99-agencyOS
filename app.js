const express = require('express');
const router = express.Router();
const pushByDay = require ('./pushByDay').pushByDay;
const pushByBrand = require ('./pushByBrand').pushByBrand;
const pushByUser = require ('./pushByUser').pushByUser;
const pushByType = require ('./pushByType').pushByType;
const buildExportable = require ('./downloadExport').buildExportable;

let app = express();

// handle exceptions
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });


app.get('/update', function(request, response) {
    console.log('dashboard filter received')
    response.send('dashboard filter received'); pushByDay(); pushByBrand(); pushByUser(); pushByType() });

app.get('/download', function(request, response) {
    console.log('download request received')
    let packed = buildExportable();

    packed.then(function (data) {
        console.log('download started');
        console.log(data);
        response.download(data);
    }).catch((err) =>{ throw err})});

app.post('/', function(request, response) {
    
        response.send('hello POST')});

app.listen(3000,() => {
    console.log("Started on PORT 3000");
})

