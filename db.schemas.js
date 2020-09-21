const mongoose = require ('mongoose');

// configure mongoose db entities

const tableSchema = new mongoose.Schema({
    coda_id: String,
    name: String,
    type: String,
  });

const Table = mongoose.model('Table', tableSchema);

const rowSchema = new mongoose.Schema({
    coda_table_id: String,
    index: Number,
    coda_row_id: {type: String,
        unique: true,
    },
    values: Object,
    type: String,
    href: String,
    createdAt: Date,
    date_reported: Date,
  }, {strict: true, collection: 'reportedTasks'}
);

const Row = mongoose.model('Row', rowSchema);

module.exports.row = Row;
module.exports.table = Table;