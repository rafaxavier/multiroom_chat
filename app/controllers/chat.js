module.exports.iniciaChat = function(application, req, res){
	// recebendo os dados da requisição e arm na var
	var dadosForm = req.body;

	// validado os dados do form
	req.assert('apelido', 'Campo apelido é obrigatório').notEmpty();
	req.assert('apelido', 'Campo apelido deve conter de 5  a 10 chars').len(5,10);

	// armazenando na var os erros
	var erros = req.validationErrors();

	// existindo erros renderizar na index as msg de erros
	if(erros){
		res.render('index' ,{validacao:erros});
		return;
	}

	// função que emite para o evento 'msgParaCliente', o apelido da req + a msg 
 	application.get('io').emit('msgParaCliente',{apelido:dadosForm.apelido, mensagem:"acabou de entrar"});


 	// renderiza o chat passando 
	res.render('chat', {apelido: dadosForm.apelido});
}