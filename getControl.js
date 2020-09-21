const config = require ('./config');
const axios = require('axios');
const uri = `https://coda.io/apis/v1/docs/${config.reportCodaDoc}/controls/`

const getControl = async function (controlUID) {
    let data = await axios.get(
        uri+controlUID,
        {
            headers: {
              'Authorization': config.codaToken,
            }})
        .then (
            async function (response) {
                return response.data;
            }
        )
    return data;
}

const buildFilter = async function (controlUID) {
    let control = await getControl(controlUID)
    let filter = {}
    filter.type = 'values.'+control.name;
    filter.value = control.value;
    return filter;
}

const brand_selector = 'ctrl-61_4UgUMvb';
const date_reported_control = 'ctrl-yTQX5tM-be';

module.exports.getControl = getControl;
module.exports.buildFilter = buildFilter;

