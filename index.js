var express = require("express");
var app = express();


app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(process.env.PORT || 5000));

io.sockets.on('connection', function (socket) {
	var client = socket.id;
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
        console.log("success");
    });

    socket.on('div-change', function (data) {
    	io.sockets.emit('div-change', data);
    	console.log("data" + data);
    });
});


console.log("Listening on port " + process.env.PORT || 5000);