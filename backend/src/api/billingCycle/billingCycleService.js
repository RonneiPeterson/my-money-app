//importando o schema do mongoose para o restful
const BillingCycle=require('./billingCycle')

const errorHandler=require('../common/errorHandler');

//definindo os metodos que do express que serao usados
BillingCycle.methods(['get','post','put','delete'])

/*Configurando para apos um update ele retornar o novo objeto e nao o antigo
e tmbm para que as validacoes do schema sejam aplicadas tmbm no put e nao apenas no post
que é o padrao */
BillingCycle.updateOptions({new:true,runValidators:true})

//adicionando o nosso middleware de tratamento de erros "depois" do post e do put
//que tratara a mensagem de erro de devolvera de forma padronizada

//poderia ter feito assim  tmbm (encadeando as chamadas)
//BillingCycle.after('post',errorHandler).after('put',errorHandler);

BillingCycle.after('post',errorHandler);
BillingCycle.after('put',errorHandler);
//******************************************* */



/*
Um dos colegas de curso se deparou com o seguinte problema:
 Todos as rotas estão funcionando, menos a que realiza o GET. 
 Investigamos e de fato, o get retorna apenas um array vazio.
  Cremos que seja algum problema versão do  node-restful com as demais bibliotecas.
   Felizmente, podemos circundar esse problema sobrescrevendo a rota Get

   Para que o skip e limit funcionem nos parametros precisa apos o find
   fazer as chamadas do mongoose de skip e limit
   passando os parametros enviando no request

*/   
BillingCycle.route('get',(req,res,next)=>{

    
    BillingCycle.find({},(err,docs)=>{
        if (!err){
            res.json(docs)
        }
        else{
            res.status(500).json({errors:[error]})
        }
    }).skip(req.query.skip).limit(req.query.limit)
})


//****rota que conta quantos registros tem******
BillingCycle.route('count',(req,res,next)=>{

    //o count ja é um metodo do mongoose
    //que retorna uma callback com erro ou valor (qtde)
    BillingCycle.count((error,value)=>{
        if (error){
                res.status(500).json(
                    {errors:[error]}
                );
        }
        else{
                res.json({value});
        }
    })
})
//***************************************************** 

BillingCycle.route('summary', (req, res, next) => {
    
    //https://docs.mongodb.com/manual/reference/operator/aggregation/project/

    //o project somou o campo value do credits e do debts
    //e retornou um registro por linha
    //o group "agrupou" tudo (semelhante ao groupby)
    //retornando um registro apenas com a soma do campo "credit" e "debit" (retornandos no project)
    //o ultimo project escolheu quais campos devem ser motrados (0 desabilita e 1 habilita)
   
    BillingCycle.aggregate([{ 
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}} 
    }, { 
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, { 
        $project: {_id: 0, credit: 1, debt: 1}
    }], (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || {credit: 0, debt: 0})
        }
    })
})



module.exports=BillingCycle;
