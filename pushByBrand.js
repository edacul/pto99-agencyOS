const Coda = require ('coda-js');
const axios = require ('axios');
const getView = require ('./getView');
const schemas = require ('./export.schemas');
const getControl = require ('./getControl').getControl;
const buildFilter = require ('./getControl').buildFilter;
const getDashboardControls = require ('./getDashboard').getDashboardControls;
const buildFilterArray = require ('./getDashboard').buildFilterArray;

const coda = new Coda('80378f43-df21-4d37-a93c-1a8de0042846');

const doc = '8VgFXpz6nr';
const byBrandTable = 'grid-0ZtQyvOUtA';

const grouping = schemas.groupByBrand;

const byBrandTableMap = {
  'brand_reported' : 'c-ylvver62cA',
  'total_time' : 'c-m7Mc0sbbUW',
  'reported_tasks' : 'c-g4lVS_wkxT',
  'users_unique' : 'c-fQn0oCTLEh',
  'avrg_task_time' : 'c-6Vh6OT3CHM', 
  'kbf_tasks' : 'c-XbV24bnTmW', 
  'new': 'c-hHLxFPEnDA',
  'first_delivery': 'c-eQwbk3uwex',
  'changes': 'c-vnmVzyJNS3',
  'rework': 'c-mxElTkB0tQ',
  'complexity_1': 'c-iyjY3tfQQ1',
  'complexity_2': 'c-jlgmhEnYo4',
  'complexity_3': 'c-faFN_PIZV_',
  'avrg_complexity': 'c-t61n8-IWvg',
}



const pushDailyGraph = async function (doc, table) {
let dashboard = await getDashboardControls();
let filterArray = await buildFilterArray(dashboard);
let view = await getView(filterArray, grouping);
let body = buildBody(byBrandTableMap, view);
axios.post(
  `https://coda.io/apis/v1/docs/${doc}/tables/${table}/rows?disableParsing=true`,
  await body,
  { headers: {
    'Authorization': 'Bearer 80378f43-df21-4d37-a93c-1a8de0042846' },
    'Content-Type': 'application/json',
  }
).then((res)=> {
  console.log(res.data);
}).catch((err) => {throw err})
}

async function buildBody (tableMap, data) {
  let array = await data;

  let skeleton = {
    'rows': [],
    'keyColumns': [
      "c-ylvver62cA"
      ]
  }

  array.forEach((datarow) => {
    skeleton.rows.push({
      "cells": [
        { "column": tableMap['brand_reported'], "value": datarow['_id']},
        { "column": tableMap['total_time'], "value": datarow['total_time']},
        { "column": tableMap['reported_tasks'], "value": datarow['reported_tasks']},
        { "column": tableMap['users_unique'], "value": datarow['users_unique']},
        { "column": tableMap['kbf_tasks'], "value": datarow['kbf_tasks']},
        { "column": tableMap['avrg_task_time'], "value": datarow['avrg_task_time']},
        { "column": tableMap['new'], "value": datarow['new']},
        { "column": tableMap['first_delivery'], "value": datarow['first_delivery']},
        { "column": tableMap['changes'], "value": datarow['changes']},
        { "column": tableMap['rework'], "value": datarow['rework']},
        { "column": tableMap['complexity_1'], "value": datarow['complexity_1']},
        { "column": tableMap['complexity_2'], "value": datarow['complexity_2']},
        { "column": tableMap['complexity_3'], "value": datarow['complexity_3']},
        { "column": tableMap['avrg_complexity'], "value": datarow['avrg_complexity']},
      ]
    })
  })
  return skeleton;
}

const wrapper = async function () { 
  await pushDailyGraph (doc,byBrandTable) };

module.exports.pushByBrand = wrapper;
