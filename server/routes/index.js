const express = require('express');
const router = express.Router();
const models = require('../../models');
const sequelize = require('sequelize');

const login = require('./login');
const list = require('./list');
const { where } = require('sequelize');
// const serveStatic = require('serve-static');
// let 


router.get('/', function(req, res){
    login.login(req, res); //웹 렌더링
});

// async function paging(curPage, totalRowCount) { // 페이지당 게시물 수 
//     let page_size = 10; // 보여지는 페이지의 갯수 : 1 ~ 5 페이지 
//     let page_list_size = 5; // limit 변수 (DB에서 가져올 게시물 수 no~
//     let no = 0; // 인자로 받은 현재 페이지 번호 
//     curPage = Number(curPage)
//      if (curPage <= 0) {
//           no = 0; curPage = 1; 
//         } else no = (curPage - 1) * page_size; // 전체 페이지 갯수
//         if (totalRowCount < 0) totalRowCount = 0; 
//         let totalPage = Math.ceil(totalRowCount / page_size); // 전체 페이지 수 
//         if (totalPage < curPage) { 
//             no = 0; curPage = 1 // totalPage 보다 더 큰 curPage가 호출되면 에러 발생시키기 
//         } 
//         let startPage = ((curSet - 1) * page_list_size) + 1; // 시작 페이지 계산 
//         let endPage = (startPage + page_list_size) - 1; // 마지막 페이지 계산 
//         let result = { "curPage": curPage, "page_list_size": page_list_size, "page_size": page_size, "totalPage": totalPage, "startPage": startPage, "endPage": endPage, "no": no } 
//         return result; 
// }


// SELECT * FROM boards WHERE delete_Yn='N'ORDER BY idx DESC LIMIT #{pageStart}, #{perPageNum};


router.get('/list', function(req, res, next){
    // list.list(req, res); //웹 렌더링
    let perPageNum = 10, page = 0;
    // page = req.params('page') > 0 ? req.params('page') : 0;
    // let page = req.params.page;
    // models.board.findAll({
    //     where:{
    //         delete_yn: 'N'
    //     }, 
    //     limit: 10,
    //     offset: 15
    // }).then(result =>{
        //     res.render("board_list", {
            //          boards: result
            //     });
            // });
        // if (page === "undified")


        models.board.findAll({
            where:{
                delete_yn: 'N'
            }, 
                limit: 10,
                offset: page
            }).then(result =>{
                res.render('board_list', {title: ' 게시판 리스트', boards: result, page:page, length:result.length-1, page_num:10, pass:true});
            });
        });
        
		// UPDATE board SET view_cnt = view_cnt + 1 WHERE idx = #{idx}

        router.post('/count_bo', function(req, res, next){
            // list.list(req, res); //웹 렌더링/
            let id = req.body.id;
            console.log(id);

            models.board.update({view_cnt: view_cnt+1}, {where: {id:id}})
                .then(result => {
                    // redirect:'board_list'
                }).catch(err => {
                    console.error(err);
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
        
        
        
        
        router.get('/totalmaxrows', function(req, res, next){
            models.board.findAndCountAll({
                where: {delete_yn: 'N'}
            }).then(result => {
        console.log(result.count);
    });
    
});

router.post('/page/:page', function(req, res, next){
    
    let page = req.params.page;
    if (err) console.error("err : " + err);
        console.log(rows.length-1);
});



// 출처: https://gocoder.tistory.com/1064 [고코더 IT Express]

router.get('/test', function(req, res, next){
    list.test(req, res); //웹 렌더링
});

router.post('/joinSuccese', function(req, res, next){
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

router.post('/idcheck', function(req, res, next){
    let body = req.body;
    console.log(body);
});


module.exports = router;

