const schemas = require ('./db.schemas');

const Row = schemas.row;

// upload to mongo functions

const upload = async function (row , codaTableid) {
    let uploadable = new Row ( { 
        coda_table_id: codaTableid, 
        index: await row.index,
        coda_row_id: await row.id,
        values: await row.values, 
        href: await row.browserLink, 
        type: await row.type, 
        createdAt: await row.createdAt,
        date_reported: await row.values.date_reported_anglo,
        }
    );

    let uploaded = await uploadable.save(
        (err) => { if (err) throw err;} 
    );

    if (uploaded) console.log('inyectado en la base');

}

module.exports.upload = upload;