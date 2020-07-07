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
const byDayTable = 'grid-S__WiabbPw';

const grouping = schemas.groupByDay;

const byDayTableMap = {
  '_id.yearMonthDay' : 'c-Lv39FCyXeB',
  'total_time' : 'c-VEFbMCkAPU',
  'reported_tasks' : 'c-sLUPCFX8O0',
  'users_unique' : 'c-_RElBy8LeZ',
  'brands_unique' : 'c-HnPKledxfT',
  'avrg_task_time' : 'c-lp0FRP8tPm', 
  'kbf_tasks' : 'c--o-61Avl-n', 
  'new': 'c-fY5Tz7lFWA',
  'first_delivery': 'c-kEHkpyGKyB',
  'changes': 'c-7c9prh-HsR',
  'rework': 'c-Av5abirDgl',
  'complexity_1': 'c-6NONUr1-5G',
  'complexity_2': 'c-0EsfNb_g8t',
  'complexity_3': 'c-Xyh0Bqie8t',
}



const pushDailyGraph = async function (doc, table) {
let dashboard = await getDashboardControls();
let filterArray = await buildFilterArray(dashboard);
let view = await getView(filterArray, grouping);
let body = buildBody(byDayTableMap, view);
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

async function buildBody (byDayTableMap, data) {
  let array = await data;

  let skeleton = {
    'rows': [],
    'keyColumns': [
      "c-Lv39FCyXeB"
      ]
  }

  array.forEach((datarow) => {
    skeleton.rows.push({
      "cells": [
        { "column": byDayTableMap['_id.yearMonthDay'], "value": datarow['_id']['yearMonthDay']},
        { "column": byDayTableMap['total_time'], "value": datarow['total_time']},
        { "column": byDayTableMap['reported_tasks'], "value": datarow['reported_tasks']},
        { "column": byDayTableMap['users_unique'], "value": datarow['users_unique']},
        { "column": byDayTableMap['brands_unique'], "value": datarow['brands_unique']},
        { "column": byDayTableMap['kbf_tasks'], "value": datarow['kbf_tasks']},
        { "column": byDayTableMap['avrg_task_time'], "value": datarow['avrg_task_time']},
        { "column": byDayTableMap['new'], "value": datarow['new']},
        { "column": byDayTableMap['first_delivery'], "value": datarow['first_delivery']},
        { "column": byDayTableMap['changes'], "value": datarow['changes']},
        { "column": byDayTableMap['rework'], "value": datarow['rework']},
        { "column": byDayTableMap['complexity_1'], "value": datarow['complexity_1']},
        { "column": byDayTableMap['complexity_2'], "value": datarow['complexity_2']},
        { "column": byDayTableMap['complexity_3'], "value": datarow['complexity_3']},
      ]
    })
  })
  return skeleton;
}

const wrapper = async function () { 
  await pushDailyGraph (doc,byDayTable) };

module.exports.pushByDay = wrapper;
