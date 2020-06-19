import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

const sendGmail = (info) => {
    let transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'kcert2018@gmail.com',
          pass: 'ehsqjfwk9414$'
        }
    }))
      
    var mailOptions = {
        from: 'kcert2018@gmail.com',
        to: info.to,
        subject: info.subject,
        text: info.text
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    })
}

module.exports.sendGmail = sendGmail
