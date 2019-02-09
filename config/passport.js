const LocalStrategy = require('passport-local').Strategy,
passport = require('passport'),
bcrypt = require('bcryptjs')
User = require('../models/User')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use(
    new LocalStrategy( async(email, password, done) => {
        try{
            const user = await User.findOne({email})
            if(!user){
                res.json({message: 'That email is not registered'})
                return done(null, false)
               
            }

            // Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err
                if(isMatch){
                    return done(null, user )
                }else{
                
                    return done(null, false )
                }
            })
        }catch(err){
            done(err)
        }
    })
)


