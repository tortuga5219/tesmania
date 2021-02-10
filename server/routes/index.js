var express = require('express');
const router = express.Router();
const models = require('../../models');

var login = require('./login');
var list = require('./list');

router.get('/', function(req, res){
    login.login(req, res); //웹 렌더링
});
router.get('/list', function(req, res, next){
    list.list(req, res); //웹 렌더링
});

router.get('/test', function(req, res, next){
    list.test(req, res); //웹 렌더링
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

