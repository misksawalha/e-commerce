"use strict";
// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer'

export async function sendEmail(dest,subject,message){

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODE_MAILER_EMAIL, // generated ethereal user
            pass: process.env.NODE_MAILER_PASSWORD, // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: `"M-shope" <${process.env.NODE_MAILER_EMAIL}>`, // sender address
        to: dest, // list of receivers
        subject: subject, // Subject line
        html: message, // html body
    });
    console.log(info)
     return info
}
