const fetch = require('node-fetch');

const apiToken = 'b074b18b835df822ae4cb32069b1618b20992171';
const apiUrl = 'https://estudointegracao.pipedrive.com/api/v1/'


module.exports = {
  getAllDeals: async function () {
    return new Promise((resolve, reject) => {
      // Filtrando os ganhos direto na api
      resolve(fetch(`${apiUrl}deals?status=won&start=o&api_token=${apiToken}`)
        .then(res => res.json()) // expecting a json response
        .then(json => json))
    })
  },
  formatDeals: function(allDealsData) {
    return {}
  }

 
}
