require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', require('./routes/api'))
app.use('/lombard', require('./routes/lombard'))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/dist'))
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));