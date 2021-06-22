

const port =3003;
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
//const allowCors = require('./cors')
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
//server.use(allowCors)
server.use(queryParser())

server.listen(port,()=>{
    console.log(`BackEnd ativo na porta ${port}`);
});

//exportando para poder usar no loader.js
module.exports=server;