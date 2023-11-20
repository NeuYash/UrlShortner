const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/Users', {
  useNewUrlParser: true, useUnifiedTopology: true
})

const userRouter = require('./routers/userRoutes')

app.use('/userRoutes',userRouter)
app.use('/', require('./routers/index'))

app.use(express.json({extended: false}));

app.listen(process.env.PORT || 5001);