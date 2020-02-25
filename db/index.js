const mongoose = require('mongoose');
const url = 'mongodb://' + process.env.USER_URI
const opt = {useCreateIndex: true, useNewUrlParser: true}
const connections = {};
const createConnection = name =>
        connections[name] = mongoose.createConnection(url + name, opt)

module.exports =  async (name) =>  {
        // console.log(name)
        return connections[name] || createConnection(name)
}