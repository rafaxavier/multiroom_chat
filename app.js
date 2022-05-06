/* importar as config do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(3000, function(){
	console.log('servidor on');
}); 

/* incorporando o websocket(tcp) na aplicação utilizando a 
mesma porta configurada no servidor(http) da aplicação */
var io = require('socket.io').listen(server);

// criando uma var global em app chamada 'io', attbr nela a instancia do io a cima 
app.set('io',io);

/* criando a conexão com websocket */
/* função 'on', recebe um evento e uma função de callback que neste caso, 
está passando uma var (var socket), como a propria conexão */
io.on('connection', function(socket){

	console.log('Usuário conectado');
	// ouvindo, recebendo evento e efetuando uma função
	socket.on('disconnect', function(){
		console.log('Usuário desconectado');
	});

	// ouvindo, recebendo evento e efetuando uma função
	socket.on('msgParaServidor',function(data){
		// função que emite para o evento 'msgParaCliente', os dados para renderizar na tela (exibe somente para que solicitou)
		socket.emit('msgParaCliente', {apelido: data.apelido , mensagem: data.mensagem});
		// função que emite para o evento 'msgParaCliente', os dados para renderizar na tela (exibe para todos, exceto p/ que, solicitou)
		socket.broadcast.emit('msgParaCliente', {apelido: data.apelido , mensagem: data.mensagem});

		/* Sempre que receber uma msg do front para ser devolvida aos participantes gravar o nome 
		de quem enviou na relação de participantes caso ainda não esteja salvo o nome */
		if( parseInt(data.participanteSalvo) == 0){
			// função que emite para o evento 'relacaoParticipantes', os dados para renderizar na tela (exibe somente para que solicitou)
			socket.emit('relacaoParticipantes', {apelido: data.apelido , mensagem: data.mensagem});
			// função que emite para o evento 'relacaoParticipantes', os dados para renderizar na tela (exibe para todos, exceto p/ que, solicitou)
			socket.broadcast.emit('relacaoParticipantes', {apelido: data.apelido , mensagem: data.mensagem});
		}
		
	});
})