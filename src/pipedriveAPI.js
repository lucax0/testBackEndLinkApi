const fetch = require('node-fetch');

const apiToken = 'b074b18b835df822ae4cb32069b1618b20992171';
const apiUrl = 'https://estudointegracao.pipedrive.com/api/v1/'

//https://developers.pipedrive.com/docs/api/v1/#!/Deals/get_deals
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
    allDealsData.data.map((data) => {
      const {title: prod, won_time : data_won, value: valor_prod} = data;
      console.log('DEAL:',{
        'p': prod,
        'dt_w' : data_won,
        'valor_prod' : valor_prod
      });
    })
    //filtrando as deals para o formato em que eu quero
    return allDealsData.data
  }
 
}
