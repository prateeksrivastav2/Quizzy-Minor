module.exports.home = function(req,res){
    if(req.isAuthenticated()){
        console.log('ok');
        return res.redirect('/teacher/logout');
    }
    return res.render('index');
}