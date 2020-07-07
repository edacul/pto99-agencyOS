const axios = require ('axios');
const getView = require ('./getView');
const schemas = require ('./export.schemas');
const getDashboardControls = require ('./getDashboard').getDashboardControls;
const buildFilterArray = require ('./getDashboard').buildFilterArray;

const doc = '8VgFXpz6nr';
const byTypeTable = 'grid-YwocC_o7UT';

const grouping = schemas.groupByType;

const byUserTableMap = {
  'task_statustype' : 'c-ylvver62cA',
  'total_time' : 'c-m7Mc0sbbUW',
  'reported_tasks' : 'c-g4lVS_wkxT',
  'brands_unique' : 'c-fQn0oCTLEh',
  'avrg_task_time' : 'c-6Vh6OT3CHM', 
  'kbf_tasks' : 'c-XbV24bnTmW', 
  'new': 'c-hHLxFPEnDA',
  'first_delivery': 'c-eQwbk3uwex',
  'changes': 'c-vnmVzyJNS3',
  'rework': 'c-mxElTkB0tQ',
  'complexity_1': 'c-iyjY3tfQQ1',
  'complexity_2': 'c-jlgmhEnYo4',
  'complexity_3': 'c-faFN_PIZV_',
  'days_reported': 'c-w_KpGPd098',
  'avrg_complexity':'c-8qABZ7aEC8',
}



const pushDailyGraph = async function (doc, table) {
let dashboard = await getDashboardControls();
let filterArray = await buildFilterArray(dashboard);
let view = await getView(filterArray, grouping);
let body = buildBody(byUserTableMap, view);
axios.post(
  `https://coda.io/apis/v1beta1/docs/${doc}/tables/${table}/rows?disableParsing=true`,
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
        { "column": tableMap['task_statustype'], "value": datarow['_id']},
        { "column": tableMap['total_time'], "value": datarow['total_time']},
        { "column": tableMap['reported_tasks'], "value": datarow['reported_tasks']},
        { "column": tableMap['brands_unique'], "value": datarow['brands_unique']},
        { "column": tableMap['kbf_tasks'], "value": datarow['kbf_tasks']},
        { "column": tableMap['avrg_task_time'], "value": datarow['avrg_task_time']},
        { "column": tableMap['new'], "value": datarow['new']},
        { "column": tableMap['first_delivery'], "value": datarow['first_delivery']},
        { "column": tableMap['changes'], "value": datarow['changes']},
        { "column": tableMap['rework'], "value": datarow['rework']},
        { "column": tableMap['complexity_1'], "value": datarow['complexity_1']},
        { "column": tableMap['complexity_2'], "value": datarow['complexity_2']},
        { "column": tableMap['complexity_3'], "value": datarow['complexity_3']},
        { "column": tableMap['days_reported'], "value": datarow['days_reported']},
        { "column": tableMap['avrg_complexity'], "value": datarow['avrg_complexity']},
      ]
    })
  })
  return skeleton;
}

const wrapper = async function () { 
  await pushDailyGraph (doc,byTypeTable) };

module.exports.pushByType = wrapper;
