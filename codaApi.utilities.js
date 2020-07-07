const axios = require('axios');

// get coda data functions

// get table columns

const getCodaColumn = function getCodaColumn (table){
    axios.get(
        `https://coda.io/apis/v1beta1/docs/Iw5mBxlHw1/tables/${table}/columns`,
        {
            headers: {
              'Authorization': 'Bearer 80378f43-df21-4d37-a93c-1a8de0042846'
            }})
        .then (
            async function (response) {
                console.log (await response.data.items.length)
            }
        )
}
    
// get table rows

const getCodaRows = function (limit) {
    axios.get(
        `https://coda.io/apis/v1beta1/docs/Iw5mBxlHw1/tables/grid-CzvDuUAfRP/rows?${limit}`, 
        {
        headers: {
          'Authorization': 'Bearer 80378f43-df21-4d37-a93c-1a8de0042846'
        }})
      .then((res) => {console.log(res.data)})
      .catch((err) => {
          console.log(err);
      });
}

const postCodaRows = function (query, callback, page){
    axios.get(
        page || `https://coda.io/apis/v1beta1/docs/Iw5mBxlHw1/tables/grid-CzvDuUAfRP/rows?useColumnNames=true&${query}`, 
        {
        headers: {
          'Authorization': 'Bearer 80378f43-df21-4d37-a93c-1a8de0042846'
        }})
      .then(async function(response) {
        if (response.data.items.length > 499) {
            console.log('iterating new records')
            response.data.items.forEach(callback);
            postCodaRows(query, callback, response.data.nextPageLink)

        }
        if (response.data.items.length < 500) {
            response.data.items.forEach(callback);
            console.log('last page saved')
        }
      })
      .catch((err) => {
          console.log(err);
      });
}


module.exports.getcodacolumn = getCodaColumn;

module.exports.getcodarows = getCodaRows;
module.exports.postcodarows = postCodaRows;