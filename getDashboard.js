const config = require ('./config');
const axios = require('axios');
const uri = `https://coda.io/apis/v1beta1/docs/${config.reportCodaDoc}/controls/`

const getDashboardControls = async function () {
    let data = await axios.get(
        uri,
        {
            headers: {
              'Authorization': config.codaToken,
            }})
        .then (
            async function (response) {
                let output = [];
                let input = await response.data.items;
                input.forEach((control) => {
                    if (control.name.includes('button')){return};
                    if (control.name.includes('date_reported_control')) {
                        output.push ({
                            type: 'date',
                            coda_object: control.type,
                            coda_id: control.id, 
                            name: control.name,
                            variable: 'date_reported',
                        })
                    };
                    if (control.name.includes ('reported_brand_selector')) {
                        output.push ({
                            type: 'multiselect',
                            coda_object: control.type,
                            coda_id: control.id, 
                            name: control.name,
                            variable: 'reported_brand',
                        })
                    };
                    if (control.name.includes ('user_selector')) {
                            output.push ({
                                type: 'multiselect',
                                coda_object: control.type,
                                coda_id: control.id, 
                                name: control.name,
                                variable: 'user_email',
                        })
                    }
                });
                return output; 
            }
        )      

    return data;
}

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

const buildFilterObject = async function (controlObject) {
    let control = await controlObject;
    let controlState = await getControl (control.coda_id) ;
    let filter = {}
    if (control.type == 'date') {
        filter[String(`${control.variable}`)] = { '$gt': await dateFromISO(controlState.value.split(',')[0]), '$lt': await dateFromISO(controlState.value.split(',')[1])};
        return filter;
    }
    if (control.type == 'multiselect') {
        let filteredEntities = controlState.value.split(',');
        if (filteredEntities.length == 1) {
        filter[String(`values.${control.variable}`)] = filteredEntities[0];
        return filter;
        }
        // filter[String(`values.${control.variable}`)] = { '$or' : [ ] } ;
        let multiselector = [ ]
        for (entity of filteredEntities ) {
            multiselector.push({[`values.${control.variable}`] : entity})
        };
        filter = { '$or': multiselector};
        return filter;
    }
}

const buildFilterArray = async function (controlArray) {
    let controls = await controlArray;
    let filter = { '$match' : { }};
    if (controls.length == 1) { 
        filter['$match'] = await buildFilterObject (controls[0]);
        return filter;
        }
    filter['$match']['$and'] = [ ];
    for (mappedControl of controls) {
        let control = await buildFilterObject(mappedControl)
        console.log(control)
        filter['$match']['$and'].push(control);
    }
    return filter;
}

const buildDashboard = async function (dashboardControls) {
    const buildFilter = 1;
}

async function dateFromISO(isostr) {
    var parts = await isostr.match(/\d+/g);
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
}


const onedashboard = getDashboardControls();

module.exports.getDashboardControls = getDashboardControls
module.exports.buildFilterArray = buildFilterArray

module.exports.testArray = buildFilterArray(onedashboard)
