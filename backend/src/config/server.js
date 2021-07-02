

const port =3003;
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

//middleware nosso que adiciona os cabecalhos do cors
server.use(allowCors)

//esse middleware faz o parser dos parametros query enviados na url
//como por exemplo os parametros skip e limit para limitar a pesquisa
//localhost:3003/api/BillingCycles?skip=0&limit=1
server.use(queryParser())
//**************************** */

server.listen(port,()=>{
    console.log(`BackEnd ativo na porta ${port}`);
});

//exportando para poder usar no loader.js
module.exports=server;