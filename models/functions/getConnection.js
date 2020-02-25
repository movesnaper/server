const mongoose = require('mongoose')
const { USER_URI, MONGO_URI } = process.env
const connections = {};
const createConnection = (name) => {
        const url = 'mongodb://' + USER_URI + name
        const opt = {useCreateIndex: true, useNewUrlParser: true}
        return connections[name] = mongoose.createConnection(url, opt, (err) => {
                if (err) throw "no_connection"
        })
}

module.exports =  (name, schema) =>  {
        const url = mongoose.conn || MONGO_URI
        const conn = connections[url] || createConnection(url)
        return conn.model(name, schema)
}