const User = require('../models/User'),
bcrypt = require('bcryptjs'),
passport = require('passport')


// Registration
module.exports.register = async (req, res) => {
    const {name, username, email, password, confirmPassword,profilePicture
    ,gender,contact,location} = req.body
    errors = {}
 if(!password){
     errors.password = 'Password is required'
    return res.json(errors)
 }else if(password !== confirmPassword){
     errors.password = `Password didn't matched`
    return res.json(errors)
 }else if(password.length < 6){
     errors.password = `Password must be more than 6 characters`
     return res.json(errors)
 }

    const user = new User({
        name, username,contact, profilePicture, email, gender, contact, location, password: bcrypt.hashSync( password, 10)
    })

    try{
        const newUser = await user.save()
        res.json(newUser)
    }catch (e){
        Object.keys(e.errors).forEach(key => {
            errors[key] = e.errors[key].message
        })
        res.status(400).json(errors)
        
    }
}

// Login

module.exports.login = async (req, res, next) => {
    const {email, password} = req.body
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
                return res.json(user)
            }else{
                return res.json({message: 'Password invaid'})
            }
        })
    }catch(err){
        res.json(err)
    }
    
   
}