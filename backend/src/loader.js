//***Main do BackEnd****

const server=require('./config/server')
require('./config/database')

//faco a requisicao se passo o server de parametro
require('./config/routes')(server);