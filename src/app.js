//Lucas Uesato
//TESTE BACKEND LINKAPI
const express = require('express');
const pipedriveAPI = require('./pipedriveAPI')
const blingAPI = require('./blingApi')
const mongoDB = require('./mongoDB')

const { request, response } = require('express');

const app = express();

app.use(express.json());

function logRequests(request, response, next) {
  const { method, url } = request;

  const log = `[${method}] ${url}`;//template string

  console.time(log);
  next();
  console.timeEnd(log);
} //Remover antes de enviar?

app.use(logRequests)


async function apiStart() {
  try {
    //Script de inicio da api, consultar pipedrive jogar no bling e add no mongodb todas as propostas nao repetidas
    const obj = await pipedriveAPI.getAllDeals();

    const returnBling = await blingAPI.postAllSales(obj);
  } catch (error) {
    console.log(error);
    return response.status(400).json({ "error": error });
  }
};

apiStart();

app.get('/dealsReport', async (request, response) => {
  const findAllDB = await mongoDB.findAllDB();

  return response.json(await mongoDB.filterDB(findAllDB))

})

module.exports = app;