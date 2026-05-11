const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.use(express.statis('public'))

app.use('/api/v1', require('./routes/api/v1'))
app.use(require('./routes/'))