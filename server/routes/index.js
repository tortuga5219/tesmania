const express = require('express');
const router = express.Router();
const models = require('../../models');
const sequelize = require('sequelize');

const login = require('./login');
const list = require('./list');
const { Callbacks } = require('jquery');

// const serveStatic = require('serve-static');
// let 


router.get('/', function (req, res) {
    login.login(req, res); //웹 렌더링
});




// SELECT * FROM boards WHERE delete_Yn='N'ORDER BY idx DESC LIMIT #{pageStart}, #{perPageNum};
router.get('/list', function (req, res, next) {
    // list.list(req, res); //웹 렌더링
    // let perPageNum = 10;
    // const totalrows = models.board.findAndCountAll({ where: { delete_yn: 'N' } });


    let page = req.params.page;

    // if(pageNum > 1){
    //     offset = 10 *(pageNum-1);
    // }
    const listControll = models.board.findAndCountAll({
        where: {
            delete_yn: 'N'
        },
        // limit: 10,
        // offset: offset
    }).then(result => {




        res.render('board_list', {
             title: ' 게시판 리스트', 
             boards: result.rows,
             currentPage,
             startPage,
             endPage, 
             maxPage,
             totalPage

            });
        console.log("paging data: " + result.count);
        let rows = result.rows;
        let count = result.count;
        return (rows, count);
    }).catch(err =>{
        console.error(err);
    });
});

router.post('/list/:page' ,function(req, res, next){

});

// UPDATE board SET view_cnt = view_cnt + 1 WHERE idx = #{idx}
router.post('/count_bo', function (req, res, next) {

    let id = req.body.id;
    models.board.findOne({ where: { id: id } })
        .then(result => {
            console.log("view : " + result.view_cnt);
            models.board.update({ view_cnt: result.view_cnt + 1 }, { where: { id: id } })
        });
});



// router.get('/page/:page',function(req,res,next)
// {
//     var page = req.params.page;
//     var sql = "select idx, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
//         "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board";
//     conn.query(sql, function (err, rows) {
//         if (err) console.error("err : " + err);
//         res.render('page', {title: ' 게시판 리스트', rows: rows, page:page, length:rows.length-1, page_num:10, pass:true});
//         console.log(rows.length-1);
//     });
// });

// router.get('/totalmaxrows', function (req, res, next) {
//     models.board.findAndCountAll({
//         where: { delete_yn: 'N' }
//     }).then(result => {
//         console.log(result.count);
//     });

// });

router.post('/page/:page', function (req, res, next) {

    let page = req.params.page;

    if (err) console.error("err : " + err);

    console.log(rows.length - 1);


});



// 출처: https://gocoder.tistory.com/1064 [고코더 IT Express]

router.get('/test', function (req, res, next) {
    list.test(req, res); //웹 렌더링
});

router.post('/joinSuccese', function (req, res, next) {
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
    }).catch(err => {
        console.log("데이터 추가 실패");
    })
});

router.post('/idcheck', function (req, res, next) {
    let body = req.body;

    console.log(body);


});


module.exports = router;
