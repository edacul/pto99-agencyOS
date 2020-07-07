const axios = require ('axios');
const config = require ('./config');
const getKbfUsers = require ('./kanbanflowApi.utilities').getKbfUsers;

const codaDoc = config.contextDataCodaDoc;
const codaTable = config.contextDataCodaTable;
const kbfBoards = config.kanbanflowBoards;

const buildBody = async function (apiData) {
    let users = await apiData;
    let body = {
            'rows': [],
            'keyColumns': [
              "c-Whu89M2xlF"
              ]
            };
    for (user of users) {
            body.rows.push({
                'cells': [
                    { "column": 'c-Whu89M2xlF', "value": user.email},
                    { "column": 'c-lMKws0GkyM', "value": user._id},
                    { "column": 'c-4JGWrd8-Vs', "value": user.fullName},
                ]
            })
    };
    pushToCoda (body);

}

const pushToCoda = async function (asyncBody) {
    let body = await asyncBody;
    axios.post(
        `https://coda.io/apis/v1beta1/docs/${codaDoc}/tables/${codaTable}/rows?disableParsing=true`,
        body,
        { headers: {
          'Authorization': 'Bearer 80378f43-df21-4d37-a93c-1a8de0042846' },
          'Content-Type': 'application/json',
        }
      ).then((res)=> {
        console.log('CEREBRO - uploading to coda CONTEXTDATA container')
        console.log(res.data);
      }).catch((err) => {throw err})
}


for (board of kbfBoards){
    getKbfUsers(board)
    .then(buildBody)
    .then(pushToCoda);
}
