const mongoose = require('mongoose')
require('../models')
const jwt = require('jsonwebtoken')
const {SECRET_OR_KEY} = process.env

const verify =  token =>  {
    return jwt.verify(token, SECRET_OR_KEY)
}

const sign = (v, expiresIn) => jwt.sign(v, SECRET_OR_KEY)

const headers = name => ({body, headers}, res, next) => {
    Object.assign(body, verify(headers[name]))
    next() 
}

const conn = async ({ company_id }, res, next) => {
    if (!company_id) return res.status(401).json('no company specified')
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