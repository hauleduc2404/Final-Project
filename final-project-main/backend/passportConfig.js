const { prisma } = require('./modules/database')
let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const initialize = (passport) => {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.SECRET_KEY;
    // opts.issuer = process.env.ISSUER;
    // opts.audience = process.env.AUDIENCE;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        prisma.user.findFirst({
            where: {id: BigInt(jwt_payload.uid)},
            select: {
                id: true, name: true, email: true, phone: true
            }}
        ).then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
            
        }).catch(err => {
            if (err) {
                return done(err, false);
            }
        })
        
    }));

}

module.exports = initialize
// export default initialize
