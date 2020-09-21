const axios = require('axios');

const baseURL = "https://coda.io/apis/v1";

const accesToken = "80378f43-df21-4d37-a93c-1a8de0042846"; 

const getCodaRows = async function (docId, tableId , limit) {
    let res = axios.get(
        `${baseURL}/docs/${docId}/tables/${tableId}/rows?useColumnNames=true&${limit}`, 
        {
        headers: {
          'Authorization': `Bearer ${accesToken}`
        }})
      .then((res) => {return res})
      .catch((err) => {
          console.log(err);
      });
      return res;
}

module.exports.getCodaRows = getCodaRows;