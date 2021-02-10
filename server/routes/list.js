var board_list = {
    list : function(req, res, next){
        // res.send('board list');
        // console.log(req)
        res.render('../views/board_list');
    },
    insert : function(req, res, next){
        let body = req.body;
        console.log(req + body);
    }
    // router.showlist((), {

    // })
};

module.exports = board_list;

//리스트에서 할 일
//게시판 페이지 로드 전 criteria(페이지 번호) 와 테이블 데이터를 json 형태의 리스트에 적재 후 게시판 페이지에 전달
//글 쓰기 페이지 연결
//생성 기능
//업데이트 페이지(상세 페이지) 연결
//업데이트 기능
//삭제 기능