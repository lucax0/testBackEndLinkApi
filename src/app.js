//Lucas Uesato
//TESTE BACKEND LINKAPI
const express = require('express');
const pipedriveAPI = require('./pipedriveAPI')
const blingAPI = require('./blingApi')

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

app.get('/update', async (request, response) => {

  const obj = await pipedriveAPI.getAllDeals();

  const returnBling = await blingAPI.postAllSales(obj);
  return response.json(returnBling)
  // const findAllDB = await mongoDB.findAllDB();
  return response.json({ findAllDB })
})

module.exports = app;