const MongoClient = require('mongodb').MongoClient;
const psswrd = euJnyqqp00j5bzBç
const uri = `mongodb+srv://apiTest:${psswrd}@cluster0-fcpmn.gcp.mongodb.net/apiLink?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });


module.exports = {
  connectDB: async function () {
    await client.connect(err => {
      const collection = client.db("apiLink").collection("savedDeals");
      // perform actions on the collection object 
      console.log(collection) 
      // console.log('Connect',client)

      client.close();
    });
  }
}