const {User} = require('./../models/user')

const authenticate = (req, res, next) => {
    const token = req.header('x-auth')

    User.findByToken(token).then((user)=>{
        
        if(!user){
            return Promise.reject()
        }

        res.user = user
        res.token = token
        next()
        
    }).catch((e)=>{
        res.sendStatus(401)
    })
}

module.exports = {authenticate}