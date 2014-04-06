var express = require("express");
var app = express();
fs = require('fs');


app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(process.env.PORT || 5000));

io.sockets.on('connection', function (socket) {
    // var css = fs.readFileSync("public/css/custom.css", "utf8");
	var client = socket.id;
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
        console.log("success");
    });

    // socket.emit('css', { css: css });
    // socket.emit('css', { css: css });
    socket.on('div-change', function (data) {
        console.log("successsssssssssssssssssssssssssssssssssssssss");
    	io.sockets.emit('div-change', data);
        // io.sockets.emit('css', css);
    	// console.log("data" + data);
    });
})






console.log("Listening on port " + process.env.PORT || 5000);