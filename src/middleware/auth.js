module.exports = function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'Por favor realize o login!');
        res.redirect('/signin');
    }
