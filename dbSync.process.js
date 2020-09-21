const mongoose = require ('mongoose');

const codaUtilities = require ('./codaApi.utilities');

const dbUtilities = require ('./dbSave.utilities');
const uri = 'mongodb+srv://nest:holanest@cerebro.wdydz.mongodb.net/CEREBRO?retryWrites=true&w=majority'; // mover a config.js
const dbDocId = "Iw5mBxlHw1" ;
const dbTableId = "grid-CzvDuUAfRP" ;

const getCodaRows = codaUtilities.getCodaRows;
const upload = dbUtilities.upload;

const postCodaRows = async function (query, callback, page){
    getCodaRows( dbDocId , dbTableId , query )
      .then(function(response) {
        if (response.data.items.length > 499) {
            console.log('iterating new records')
            response.data.items.forEach((row) => callback(row, dbDocId));
            postCodaRows(`pageToken=${response.data.nextPageToken}`, callback)

        }
        if (response.data.items.length < 500) {
            response.data.items.forEach((row) => callback(row,dbDocId));
            // console.log(response.data.items)
            console.log('last page saved')
        }
      })
      .catch((err) => {
          console.log(err);
      });
}

mongoose.connect(uri , { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(
    () => {const db = mongoose.connection; console.log('connected')},
    err => {  console.log('not connected'); throw err}
);

postCodaRows("limit=1000", upload)