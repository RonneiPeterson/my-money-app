/*

Criando  um middleware que vai por cabecalho indicando que aceita requisicoes
de outras origens

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

CORS - Cross-Origin Resource Sharing (Compartilhamento de recursos com origens diferentes) 
é um mecanismo que usa cabeçalhos adicionais HTTP para informar a um navegador que permita 
que um aplicativo Web seja executado em uma origem (domínio) com permissão para acessar 
recursos selecionados de um servidor em uma origem distinta. Um aplicativo Web executa
 uma requisição cross-origin HTTP ao solicitar um recurso que tenha uma origem 
 diferente (domínio, protocolo e porta) da sua própria origem.

*/

module.exports= (req,resp,next)=>{

    resp.header('Access-Control-Allow-Origin','*');
    resp.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    resp.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    
    next();//enviando para o proximo middleware

}