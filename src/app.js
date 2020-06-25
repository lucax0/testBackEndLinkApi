//Lucas Uesato
//TESTE BACKEND LINKAPI
const express = require('express');
const { request, response } = require('express');

const app = express();

app.use(express.json());

function logRequests(request, response, next) {
  const { method, url } = request;

  const log = `[${method}] ${url}`;

  console.time(log);
  next();
  console.timeEnd(log);
}

app.use(logRequests)

app.get('/hello', (request,response) => {
  return response.json({'OI' : 'Mundo'})
})

app.listen(5000, () => {
  console.log('✌ App Running on 5000 ✌')
});