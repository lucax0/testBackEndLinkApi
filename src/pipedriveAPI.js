const fetch = require('node-fetch');

const apiKey = 'b074b18b835df822ae4cb32069b1618b20992171';
const apiUrl = 'https://estudointegracao.pipedrive.com/api/v1/'

//https://developers.pipedrive.com/docs/api/v1/#!/Deals/get_deals
module.exports = {
  getAllDeals: async function () {
    return new Promise((resolve, reject) => {
      // DOC PROMISE  https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise
      // Filtrando os ganhos direto na api
      resolve(fetch(`${apiUrl}deals?status=won&start=o&api_token=${apiKey}`)
        .then(res => res.json())
        .then(json => this.formatDeals(json)))

    })
  },

  formatDeals: function (allDealsData) {
    const dealsFormated = [];
    // Ordenando as deals
    allDealsData.data.map((data) => {
      let deal = {}
      // desestrutruracao de obj
      const { id: id, title: product, won_time: data_won, value: value_prod, person_name: person_name } = data;

      deal = Object.assign(deal, { id, product, data_won, value_prod, person_name })

      dealsFormated.push(deal)
    })
    return dealsFormated
  }

}
