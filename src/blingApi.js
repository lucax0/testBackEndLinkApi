const fetch = require('node-fetch');
const xml2js = require('xml2js');//https://www.npmjs.com/package/xml2js
const mongoDB = require('./mongoDB')

const apiKey = '166d99cfa0fb8e4b6bf12c53a27ee3cd7b73de79600b482534472904fa00692e0d256788'
const apiUrl = 'https://bling.com.br/Api/v2/pedido/json/'

module.exports = {
  postAllSales: async function (data) {
    const results = []

    let returnPost = {};

    const dataDeal = data

    const builderXml = new xml2js.Builder()

    for (let i = 0; i < dataDeal.length; i++) { // clientes com status ganhos ja estao filtrados direto da api via query param

      const xmlDeal = builderXml.buildObject(
        {
          'pedido': {
            'cliente': {
              'nome': dataDeal[i].nome
            },
            'itens': {
              'item': {
                'codigo': dataDeal[i].codigo,
                'descricao': dataDeal[i].descricao,
                'vlr_unit': dataDeal[i].vlr_unit
              }
            }
          }
        })

      await new Promise(resolve => setTimeout(resolve, 1000));

      new Promise((resolve, reject) => {
        resolve(fetch(`${apiUrl}?apikey=${apiKey}&xml=${xmlDeal}`, { method: 'POST' })
          .then(res => res.json())
          .then(json => {
            json.retorno.pedidos ? mongoDB.saveDB(dataDeal[i].data_won.split(' ')[0], dataDeal[i].vlr_unit, dataDeal[i].descricao) :
              console.log({ 'err': 'Produto ja cadastrado ou invalido' });
          })
          .then(results.push(returnPost))
        )
      })
    }
    return results
  }

}