const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const foundUser = await prisma.users.findFirst({where: {email: email}})
                if (foundUser) {
                    return done("Email đã đăng ký!")
                } else {
                    let hash = await bcrypt.hash(this.password, 10);
                    const user = await prisma.User.create({
                        data: {
                            email: email,
                            password: hash
                        }
                    })
                }
                const user = await UserModel.create({ email, password });

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);
