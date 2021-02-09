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