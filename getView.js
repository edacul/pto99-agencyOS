const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');
  
const getView = async function (filterOptions, groupingOptions) {
    const client = new MongoClient(
        'mongodb+srv://nest:holanest@cerebro-wdydz.mongodb.net/CEREBRO?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const connection = await client.connect();
    const filter = await filterOptions;
    console.log(filter)
    const grouper = await groupingOptions;
    const db = connection.db('CEREBRO');
    const collection = db.collection('rows');

    if (!filter && !grouper) {
        const cursor = collection.aggregate();
        return cursor.toArray();
    }
    let aggregate = await buildAggregate(filter, grouper);
    let cursor = collection.aggregate(aggregate);
    let output = await cursor.toArray();
    console.log(output.length);
    return output;
};

const buildAggregate = async function (filterOpt, aggOpt) {
    let aggregate = [ ];
    let match = await filterOpt;

    if( !aggOpt && !match) {new Error ('no grouping nor filtering options'); return}

    if( !aggOpt ) { aggregate.push (await match);console.log ('filtering'); return aggregate }

    if( !match ) { await aggOpt.forEach ((stance) => aggregate.push(stance));console.log ('grouping'); return aggregate }

    console.log ('filtering');
    aggregate.push (await match);
    console.log ('grouping')
    aggOpt.forEach ((stance) => aggregate.push(stance));
    
    return aggregate;
}

const getFilter = async function (filterObject) {
    const client = new MongoClient('mongodb+srv://nest:holanest@cerebro-wdydz.mongodb.net/CEREBRO?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = await client.connect();
    const db = connection.db('CEREBRO');
    const collection = db.collection('rows');
    let aggregator = await filter(filterObject.type,filterObject.value);
    const cursor = collection.aggregate(aggregator);
    return cursor.toArray();
};

module.exports = getView;