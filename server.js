require('dotenv').config();
var cors = require('cors')
const path = require('path');
const express = require('express');
const app = express()
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cors())
app.use('/api', require('./routes/admin'))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));