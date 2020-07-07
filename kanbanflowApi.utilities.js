const axios = require('axios');
const config = require ('./config');

const baseURL = 'https://kanbanflow.com/api/v1'

const getKbfUsers = async function getKbfUsers (board){
    let users = await axios.get(
        baseURL+'/users?apiToken='+board.token,
        )
        .then (
            async function (response) {
                return response.data;
            }
        )
        .catch((err) => { 
            throw err;
        });
    console.log('CEREBRO - get Kanbanflow users: ' + board.board);
    return users;
}

module.exports.getKbfUsers = getKbfUsers;