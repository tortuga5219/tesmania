const express = require('express');
const http = require('http');
const path = require('path');


//meddle ware load
var bodyPaser = require('body-parser');
var static = require('serve-static');

var app = express();
var router = require('./server/routes/index');

app.set('port', process.env.PORT || 8001);

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
// app.engine('')
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express listening on port" + app.get('port'));
});

var indexRouter = require('./server/routes/index');

//req 요청 URL 및 처리로직 선언한 라우팅 모듈 매핑
app.use('/', indexRouter);

