const mongoose=require('mongoose');
//para evitar warnings
mongoose.Promise=global.Promise;

module.exports=mongoose.connect('mongodb://localhost/mymoney', { useNewUrlParser: true })

mongoose.connection.on('connected', function () {
  console.log('Connected to Database');
});
// Mensagem de Erro
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});


//traduzindo a mensagem de erro do mongoose
mongoose.Error.messages.general.required="O atributo '{PATH}' é obrigatório."
