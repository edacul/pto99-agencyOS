const mongoose = require ('mongoose');

const codaUtilities = require ('./codaApi.utilities');

const dbUtilities = require ('./dbSave.utilities');
const uri = 'mongodb+srv://nest:holanest@cerebro-wdydz.mongodb.net/CEREBRO?retryWrites=true&w=majority';

const postCodaRows = codaUtilities.postcodarows;
const upload = dbUtilities.upload;

mongoose.connect(uri , { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(
    () => {const db = mongoose.connection; console.log('connected')},
    err => {  console.log('not connected'); throw err}
);

postCodaRows("limit=1000", upload)
