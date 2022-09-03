require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const animalRouter = require('./routers/animal_routes')
const userRouter = require('./routers/user_routes')


app.use('/api/v1/', listingRouter)
app.use('/api/v1/users', userRouter)

app.get('/',(req,res)=>{
    res.send('hello world!')
})

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})