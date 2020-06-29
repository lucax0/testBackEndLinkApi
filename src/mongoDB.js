const mongojs = require('mongojs')

// https://openbase.io/js/mongojs
// https://www.npmjs.com/package/mongojs
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
    db.savedDeals.find(function (err, docs) {
      return new Promise((resolve, reject) => {
        console.log('Consolidando DB...')
        resolve(docs);
      })
    })
  },

  saveDB: async function (dataDeal) {
    return new Promise((resolve, reject) => {
      console.log('saving on DB')
      resolve(db.savedDeals.save(dataDeal))
    })

  }
}