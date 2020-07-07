const axios = require ('axios');
const getView = require ('./getView');
const schemas = require ('./export.schemas');
const getDashboardControls = require ('./getDashboard').getDashboardControls;
const buildFilterArray = require ('./getDashboard').buildFilterArray;
const json2csv = require('json2csv').parse;
const path = require ('path');
const fs = require ('fs').promises;

const doc = '8VgFXpz6nr';

const fields = { fields: [
                          'index',
                          'date_reported',
                          'values.user_id',
                          'values.user_email', 
                          'values.reported_brand', 
                          'values.task_id', 
                          'values.task_name', 
                          'values.task_type', 
                          'values.delivery_type', 
                          'values.reported_minutes', 
                          'values.recurrent', 
                          'values.task_statustype', 
                          'values.progress', 
                          'values.comments'
                        ]};


const buildExportable = async function () {

  let dateTime = new Date().toISOString().slice(-24).replace(/\D/g,'').slice(0, 14); 
  let filePath = path.join(__dirname, "../", "public", "exports", "effortreportexport-csv-" + dateTime + ".csv");

  let dashboard = await getDashboardControls();
  let filterArray = await buildFilterArray(dashboard);
  let view = await getView(filterArray);
  let csv;

  try {
    csv = json2csv(view, fields)
  } catch (error) {
  console.log(error)
  }
  await fs.writeFile(filePath, csv, function (err) {
    if (err) {
    console.log('error al grabar'); throw err;
    }

  })
  .then( () => {
  console.log(filePath);
  });
  return filePath;
}

const package = async function (csvPath) {
  let downloadble = await csvPath;
  try {
    csv = json2csv(array, {fields});
} catch (err) {
    return res.status(500).json({err});
}

fs.writeFile(filePath, csv, function (err) {
    if (err) {
        return res.json(err).status(500);
    }
    else {
        setTimeout(function () {
            fs.unlink(filePath, function (err) { // delete this file after 30 seconds
            if (err) {
                console.error(err);
            }
            console.log('File has been Deleted');
        });

    }, 30000);
        res.download(filePath);
    }
})
}


const wrapper = async function () { 
  return await buildExportable (doc) };

module.exports.buildExportable = wrapper;
