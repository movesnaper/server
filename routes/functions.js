const mongoose = require('mongoose')
require('../models')
const jwt = require('jsonwebtoken')
const {SECRET_OR_KEY} = process.env

const  verify = async (token) =>  {
    const value = jwt.verify(token, SECRET_OR_KEY)
    if (!value) throw 'bad_token'
    return value
}

const sign = (v, expiresIn) => jwt.sign(v, SECRET_OR_KEY)

const headers = name => ({body, headers}, res, next) => {
    Object.assign(body, verify(headers[name]))
    next() 
}

const conn = async ({ company_id }, res, next) => {
        // console.log(company_id);
        
    // if (!company_id) return res.status(401).json('no company specified')
    const { conn } = await Company.findById(company_id)
    mongoose.conn = conn
    next() 
}

module.exports = {
    verify,
    headers,
    sign,
    conn
}