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
      const { id: codigo, title: descricao, won_time: data_won, value: vlr_unit, person_name: nome } = data;

      deal = Object.assign(deal, { codigo, descricao, data_won, vlr_unit, nome })

      dealsFormated.push(deal)
    })
    return dealsFormated
  }

}
