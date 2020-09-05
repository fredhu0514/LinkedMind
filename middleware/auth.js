module.exports = {
    // Middleware functions

    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        else {
            res.redirect('/');
        }
    },
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()){
            res.redirect('/home');
        } else {
            return next();
        }
    }
}
