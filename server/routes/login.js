var board_login = {
    login : function(req, res){
        res.render('../views/board_login');
    }
};

module.exports = board_login

//로그인 컨트롤에서 할일 
//로그인.jade 리다이렉션
//세션 생성
//로그아웃
//세션 체크 후 게시판 페이지 이동