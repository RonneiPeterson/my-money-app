const express=require('express')


//esse "server" foi enviado por parametro na chamada em loader.js
module.exports=function(server){
   
   const router=express.Router();
   
   //definir a URL base para todas as rotas
   server.use('/api',router)

      
   //Rotas do Ciclo de Pagamento
   const BillingCycle=require('../api/billingCycle/billingCycleService')

   
   //aqui ele vai registrar ja criando todos os metodos configurados no "service"
   BillingCycle.register(router,'/billingCycles')
}