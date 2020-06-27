const fetch = require('node-fetch');

const apiKey = '166d99cfa0fb8e4b6bf12c53a27ee3cd7b73de79600b482534472904fa00692e0d256788'
const apiUrl = 'https://bling.com.br/Api/v2/pedido/json/'
// <?xml version="1.0" encoding="UTF-8"?>
// <pedido>
//  <cliente>
//  <nome>Lucas Queiroz</nome>
//  </cliente>
//  <itens>
//  <item>
//  <codigo>001</codigo>
//  <descricao>Caneta 001</descricao>
//  <vlr_unit>1.68</vlr_unit>
//  </item> 
//  </itens>
//  <obs>Testando o campo observações do pedido</obs>
//  <obs_internas>Testando o campo observações internas do pedido</obs_internas>
// </pedido>

module.exports = {
  postAllSales: async function (data) {
    let results = []
    const dataDeal = data
    // Filtrando os ganhos direto na api
    for (let i = 0; i < dataDeal.length; i++) {

      console.log('bling post', i);
      new Promise((resolve,reject) => {resolve(fetch(`${apiUrl}?apikey=${apiKey}&xml=<?xml version="1.0" encoding="UTF-8"?><pedido><cliente><nome>${dataDeal[i].person_name}</nome></cliente><itens><item><codigo>${dataDeal[i].id}</codigo><descricao>${dataDeal[i].product}</descricao><vlr_unit>${dataDeal[i].value_prod}</vlr_unit></item></itens></pedido>`)
        .then(res => res.json())
        .then(json => console.log(json))
      )})
    }
    return Promise.all(results).then(function () {
      console.log('Result:',results);
    });
  }
}