//importando o schema do mongoose para o restful
const BillingCycle=require('./billingCycle')

//definindo os metodos que do express que serao usados
BillingCycle.methods(['get','post','put','delete'])

/*Configurando para apos um update ele retornar o novo objeto e nao o antigo
e tmbm para que as validacoes do schema sejam aplicadas tmbm no put e nao apenas no post
que é o padrao */
BillingCycle.updateOptions({new:true,runValidators:true})


/*
Um dos colegas de curso se deparou com o seguinte problema:
 Todos as rotas estão funcionando, menos a que realiza o GET. 
 Investigamos e de fato, o get retorna apenas um array vazio.
  Cremos que seja algum problema versão do  node-restful com as demais bibliotecas.
   Felizmente, podemos circundar esse problema sobrescrevendo a rota Get
   */

   
BillingCycle.route('get',(req,res,next)=>{

    
    BillingCycle.find({},(err,docs)=>{
        if (!err){
            res.json(docs)
        }
        else{
            res.status(500).json({errors:[error]})
        }
    })
})

/*
BillingCycle.route('post',(req,res,next)=>{
    
    console.log('POST');
    console.log(req.body);
    
    res.status(500).json({error:'Abortado'})
   
})*/



module.exports=BillingCycle;