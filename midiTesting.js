var easymidi = require('easymidi');
var verovio = require( 'verovio' );
var fs = require( 'fs' );

//https://www.tutorialspoint.com/socket.io/socket.io_event_handling.htm

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')

app.use(require('express').static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
   res.sendfile('public/sample_piano.html');
});

var flagcheck = false;
var keynotevalue = 36;
var keynotevalue2 = "";
var keynote = [",,4C", ",,b4D", ",,4D", ",,b4E", ",,4E", ",,4F", ",,b4G",",,4G",",,b4A",",,4A",",,b4B",",,4B",
",4C", ",b4D", ",4D", ",b4E", ",4E", ",4F", ",b4G",",4G",",b4A",",4A",",b4B",",4B",
"'4C", "'b4D", "'4D", "'b4E", "'4E", "'4F", "'b4G","'4G","'b4A","'4A","'b4B","'4B",
"''4C", "''b4D", "''4D", "''b4E", "''4E", "''4F", "''b4G","''4G","''b4A","''4A","''b4B","''4B",
"'''4C", "'''b4D", "'''4D", "'''b4E", "'''4E", "'''4F", "'''b4G","'''4G","'''b4A","'''4A","'''b4B","'''4B"]


// //Whenever someone connects this gets executed
// io.on('connection', function(socket) {
//   console.log('A user connected');

//   //Whenever someone disconnects this piece of code executed
//   socket.on('disconnect', function () {
//      console.log('A user disconnected');
//   });
// });


http.listen(3000, function() {
   console.log('listening on *:3000');
});


// //'4C'b4D'x4C'4D'b4E'x4D'4E'4F'b4G'x4F'4G'b4A'x4G'4A'b4B'x4A'4B''4C

// var inputd = "@clef:G-2\n@keysig: \n@timesig: \n@data:'4C"
// var inputoption = "{\"inputFormat\":\"pae\",\"pageHeight\":500,\"pageWidth\":1600,\"ignoreLayout\":1,\"border\":0,\"scale\":50,\"adjustPageHeight\":1}"



// /* Wait for verovio to load */
// verovio.module.onRuntimeInitialized = function ()
// {
//     /* create the toolkit instance */
//     var vrvToolkit = new verovio.toolkit();
//     /* read the MEI file */
//    // mei = fs.readFileSync("hello.mei");
//     /* load the MEI data as string into the toolkit */
//     vrvToolkit.renderData(inputd, inputoption);
//     /* render the fist page as SVG */
//     svg = vrvToolkit.renderToSVG(1, {});
//     /* save the SVG into a file */
//     fs.writeFileSync("hello.svg", svg);
// }


var inputs = easymidi.getInputs();
console.log(inputs[1]);

var input = new easymidi.Input(inputs[1]);
//io.on('connection', function(socket) {

input.on('noteon', function (msg) {
  // do something with msg
  keynotevalue = msg["note"];
  console.log(msg, msg["note"], keynote[keynotevalue - 36]);
  keynotevalue2 = keynotevalue2 + keynote[keynotevalue - 36];
  flagcheck = true;
  });




  io.on("connection", function (socket) {
    var tweet = {user: "nodesource", text: "Hello, world!"};

    // to make things interesting, have it send every second
    var interval = setInterval(function () {
      if(flagcheck == true){
        var randomnum = Math.floor(Math.random() * 12) + 24;
        console.log(keynote[randomnum], randomnum);
        socket.emit("testerEvent2", keynote[randomnum]);
        socket.emit("testerEvent", keynotevalue2);
        keynotevalue2 = "";
        flagcheck = false;
      }else
      {
        flagcheck = false;
        keynotevalue2 = "";
      }

    }, 100);

    socket.on("disconnect", function () {
        clearInterval(interval);
    });
});


//io.on('connection', function(socket) {
//  socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
//});
 

// // create virtual midi input named 'input test'
// // var input = new easymidi.Input('input test', true);

// input.on('noteoff', function (msg) {
//   console.log('noteoff', msg.note, msg.velocity, msg.channel);
// });

// input.on('noteon', function (msg) {
//   console.log('noteon', msg.note, msg.velocity, msg.channel);
// });

// input.on('poly aftertouch', function (msg) {
//   console.log('poly aftertouch', msg.note, msg.pressure, msg.channel);
// });

// input.on('cc', function (msg) {
//   console.log('cc', msg.controller, msg.value, msg.channel);
// });

// input.on('program', function (msg) {
//   console.log('program', msg.number, msg.channel);
// });

// input.on('channel aftertouch', function (msg) {
//   console.log('channel aftertouch', msg.pressure, msg.channel);
// });

// input.on('pitch', function (msg) {
//   console.log('pitch', msg.value, msg.channel);
// });

// input.on('position', function (msg) {
//   console.log('position', msg.value);
// });

// input.on('select', function (msg) {
//   console.log('select', msg.song);
// });

// input.on('clock', function () {
//   console.log('clock');
// });

// input.on('start', function () {
//   console.log('start');
// });

// input.on('continue', function () {
//   console.log('continue');
// });

// input.on('stop', function () {
//   console.log('stop');
// });

// input.on('reset', function () {
//   console.log('reset');
// });
