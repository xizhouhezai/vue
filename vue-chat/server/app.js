var express = require('express')
var app = new express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
})

server.listen(3003, () => {
  console.log('server running at 127.0.0.1:3003')
})

app.use(express.static('./public'))

io.on('connection', (socket) => {
  socket.on('sendMessage', (data) => {
		console.log('链接成功!!!')
    data.id = socket.id;  
    io.emit('receiveMessage', data);  
  })  
})