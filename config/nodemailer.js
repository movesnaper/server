
const nodemailer = require("nodemailer");
const service = process.env.MAIL_SERVICE;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;


const transporter = nodemailer.createTransport({
    service,
    auth: {
        user,
        pass
    }
});

module.exports = transporter