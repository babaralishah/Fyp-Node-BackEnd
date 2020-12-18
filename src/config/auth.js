var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwtToken = require('jsonwebtoken');
var User = require('../api/resources/User/user-models/user.model');
var devconfig = require('./process');

exports.getToken = function(user) {
    return jwtToken.sign(user, devconfig.secretKey, {expiresIn: '1d'});
}


var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = devconfig.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,(jwt_payload, done) => {
    console.log('jwt_payload: ',jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err, user) => {
        if(err) {
            return done(err, false);
        } else if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });

}));

exports.verifyuser = passport.authenticate('jwt', {session:false});