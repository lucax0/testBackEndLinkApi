//Lucas Uesato
//TESTE BACKEND LINKAPI
const express = require('express');
const pipedriveAPI = require('./pipedriveAPI')
const { request, response } = require('express');

const app = express();

app.use(express.json());

function logRequests(request, response, next) {
  const { method, url } = request;

  const log = `[${method}] ${url}`; 

  console.time(log);
  next();
  console.timeEnd(log);
} //Remover antes de enviar?

app.use(logRequests)

app.get('/update', async (request,response) => {

  const obj = await pipedriveAPI.getAllDeals();    

  return response.json(pipedriveAPI.formatDeals(obj))
})

module.exports = app;