const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const password = '123abc!'

bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, (err, hash)=>{
        console.log(hash)
    })
})

const hashedPassword = '$2a$10$5DPBcL07LMf8O0SCd7vUKO7DGrN.y8MMoskRa5KbrlqNIC/Qhcw26'

bcrypt.compare(password, hashedPassword, (err, res)=>{
    console.log(res)
})

// const message = 'Hello world'
// const hash = SHA256(message).toString()

// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)

// const data = {
//     id: 4
// }

// const token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// }

// const resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString()

// if(resultHash === token.hash){
//     console.log('Data was not changed')
// }else{
//     console.log('Data was changed dont trust!')
// }


// const data = {
//     id: 10
// }
// const token = jwt.sign(data, '123abc')

// const decoded = jwt.verify(token, '123abc')


// console.log(decoded)