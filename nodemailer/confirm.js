const transporter = require('../config/nodemailer')
const jwt = require('jsonwebtoken');
const from = process.env.MAIL_USER;
const secret = process.env.SECRET_OR_KEY
const siteUrl = process.env.SITE_URL;
const url = siteUrl + '/login';

module.exports = ({id, name, email}) => {
    const token = jwt.sign({id, email}, secret, { expiresIn: '1h' })

    return transporter.sendMail({
        from,
        to: from,
        subject: 'Confirm registration',
        text: 'plain text',
        html: `<div>
                <srtong> Site: ${siteUrl} User: ${name}</srtong>
                 <p><a href="${url}?token=${token}"> ${url}?token=${token} </a></p>
                </div>`        
    })
}