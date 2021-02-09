var express = require('express');
const router = express.Router();
const models = require('../../models');

var login = require('./login');
var list = require('./list');

router.get('/list', function(req, res, next){
    //실제 js
    list.list(req, res);
});

router.get('/', function(req, res){
    login.login(req, res);
});

router.post('/joins', function(req, res, next){
    let body = req.body;
    
    console.log(body);

    models.joinin.create({
        user_id: body.user_id,
        password: body.password,
        name: body.name,
        email: body.email,
        address: body.address
    }).then(result => {
        console.log("가입완료");
        res.redirect("/");
    }).catch(err =>{
        console.log("데이터 추가 실패");
    })
});


module.exports = router;

