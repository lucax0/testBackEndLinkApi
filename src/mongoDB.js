const mongojs = require('mongojs');
// https://www.npmjs.com/package/mongojs
const { Body } = require('node-fetch');
const groupBy = require('json-groupby');
// https://www.npmjs.com/package/json-groupby

const psswrd = '743xBtWtHSFLtSCC'
const uri = `mongodb+srv://apiTest:${psswrd}@cluster0-fcpmn.gcp.mongodb.net/apiLink?authMechanism=SCRAM-SHA-1`;

const db = mongojs(uri, ['savedDeals'])

db.on('error', function (err) {
  console.log('database error', err)
})

db.on('connect', function () {
  console.log('database connected')
})

module.exports = {

  findAllDB: async function () {
    return new Promise((resolve, reject) => {
      db.savedDeals.find().sort({ data_won: 1 }, function (err, docs) {
        console.log('Consolidando DB...')
        resolve(docs);//Docs é um array com tds os dados da collection
      })
    })
  },

  saveDB: async function (dataWon, dataValue, dataDesc) {
    //recebe uma venda e salva direto no Mongo
    return new Promise((resolve, reject) => {
      console.log('Salvando no DB...')
      resolve(db.savedDeals.save({ dataWon, dataValue, dataDesc }))
    })

  },

  filterDB: async function (dbData) {
    //filtrar para retornar todos os dados de valor por dia
    const filteredData = [];
    dbData.map((data) => {
      let obj = {}
      const { dataWon: data_venda, dataValue: valor, dataDesc: produto } = data;
      obj = Object.assign(obj, { data_venda, valor, produto });
      filteredData.push(obj)
    })
    //GROUP BY 
    const groupByData = groupBy(filteredData, ['data_venda']);
    return groupByData;

  }
}