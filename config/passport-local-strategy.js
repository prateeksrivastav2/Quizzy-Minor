const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/teacher');
const bcrypt=require('bcryptjs');
passport.use(new LocalStrategy({
        usernameField : 'email',
        passReqToCallback: true
    },
    function(req,email,password,done){
        console.log(req.body);
        console.log(password);
        const find = async()=>{
            try {
                const user = await User.findOne({ email: email });
                if (!user || req.body.role !== user.role ) {
                    console.log("Wrong username password");
                    return done(null, false);
                }
                const passcompare = await bcrypt.compare(password, user.password);
                console.log(user.password);
                console.log(passcompare);
    
                if (!passcompare) {
                    console.log("Wrong username password");
                    return done(null, false);
                }
    
                return done(null, user);
            } catch (err) {
                console.log(err);
            }
        }
        find();
    }
));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    const find = async()=>{
        try{
            const user = await User.findById(id);
            return done(null,user);
        }catch(err){
            console.log("err in finding user");
            return done(err);
        }
    }
    find();
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;