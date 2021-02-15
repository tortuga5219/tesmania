var board_list = {
    list : function(req, res, next){
        // res.send('board list');
        // console.log(req)
        res.render('../views/board_list');
    },
    insert : function(req, res, next){
        let body = req.body;
        console.log(req + body);
    },
    test : function(req, res, next){
        res.render('../views/test_login');
    },

    page : async function(curPage, totalRowCount){
        let page_size = 10; // 보여지는 페이지의 갯수 : 1 ~ 5 페이지 
        let page_list_size = 5; // limit 변수 (DB에서 가져올 게시물 수 no~ 
        let no = 0; // 인자로 받은 현재 페이지 번호 
        curPage = (curPage) 
        if (curPage <= 0) { 
            no = 0;
            curPage = 1;
         } 
         else no = (curPage - 1) * page_size; // 전체 페이지 갯수 

         if (totalRowCount < 0) totalRowCount = 0; 
        let totalPage = Math.ceil(totalRowCount / page_size); // 전체 페이지 수 
        
        if (totalPage < curPage) {
              no = 0; 
              curPage = 1 // totalPage 보다 더 큰 curPage가 호출되면 에러 발생시키기 
        } 
        let startPage = ((curSet - 1) * page_list_size) + 1; // 시작 페이지 계산 
        let endPage = (startPage + page_list_size) - 1; // 마지막 페이지 계산 
        let result = { "curPage": curPage, "page_list_size": page_list_size, "page_size": page_size, "totalPage": totalPage, "startPage": startPage, "endPage": endPage, "no": no } 
        return result;
    }

};

module.exports = board_list;

//리스트에서 할 일
//게시판 페이지 로드 전 criteria(페이지 번호) 와 테이블 데이터를 json 형태의 리스트에 적재 후 게시판 페이지에 전달
//글 쓰기 페이지 연결
//생성 기능
//업데이트 페이지(상세 페이지) 연결
//업데이트 기능
//삭제 기능