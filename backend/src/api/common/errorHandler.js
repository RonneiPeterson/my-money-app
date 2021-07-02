/*

Esse middlware vai fazer um parser nos erros gerados pelo mongoose e retornar
sempre no nosso padrao da API para erros que é

{
    errors:[]
}

Sendo assim o front pode tratar de forma sempre igual os erros

o lodash foi usado para  fazer um forin para percorrer o objeto original retornado pelo mongoose
e
extrair apenas o "message"

Os erros do mongoose eram retornados dessa maneira
{
    "errors": {
        "year": {
            "message": "Path `year` (2200) is more than maximum allowed value (2100).",
            "name": "ValidatorError",
            "properties": {
                "max": 2100,
                "type": "max",
                "message": "Path `{PATH}` ({VALUE}) is more than maximum allowed value (2100).",
                "path": "year",
                "value": 2200
            },
            "kind": "max",
            "path": "year",
            "value": 2200,
            "$isValidatorError": true
        }
    },
    "_message": "Validation failed",
    "message": "Validation failed: year: Path `year` (2200) is more than maximum allowed value (2100).",
    "name": "ValidationError"
}


*/




const _=require('lodash');
//retornando um middleware

module.exports= (req,res,next)=>{
    
    //pegando os erros
    const bundle=res.locals.bundle;

    if (bundle.errors){

        const errors=parseErrors(bundle.errors);
        
        res.status(500).json({errors:errors});

    }
    else next();//se nao tiver erros chamo o proximo middleware
}

const parseErrors=(nodeRestfullErrors)=>{

    const errors=[];

    _.forIn(nodeRestfullErrors,error=>errors.push(error.message))

    return errors;

}




