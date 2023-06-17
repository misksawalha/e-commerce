import userModel from './../../../../DB/model/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../../../services/email.js';
export const signUp = async (req, res) => {
    try {
        let { email, userName, password } = req.body

        let user = await userModel.findOne({ email }).select('email')
        if (user) {
            res.status(409).json({ message: "Email is already exist" })
        }
        else {
            let hashPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUND))
            let newUser = await new userModel({ userName, email, password: hashPassword })
            let token = await jwt.sign({ id: newUser._id }, process.env.EMAILTOKEN, { expiresIn: '1h' });
            console.log(token)
            let link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}auth/confirmEmail${token}`
            let message = `
              <a href="${link}">Confirm Email</a>
             `
            let info = await sendEmail(email, 'Verify Email', message)
            if (info.accepted.length) {
                let saveUser = await newUser.save()
                res.status(201).json({ message: "user added", savedUser: saveUser._id })
            }
            else {
                res.status(400).json({ message: "email rejected" })
            }
        }

    } catch (error) {
        res.status(500).json({ message: "catch error: " + error })
    }
}

export const confirmEmail = async (req, res) => {
    try {
        let { token } = req.params
        let decoded = await jwt.verify(token, process.env.EMAILTOKEN)
        if (!decoded.id) {
            res.status(400).json({ message: "Invalid payload" })
        }
        else {
            let user = await userModel.findOneAndUpdate({ _id: decoded.id, confirmEmail: false }, { confirmEmail: true })
            //res.status(200).redirect(link)
            res.status(200).json({ message: "confirmed email" })
        }
        console.log(decoded)
    } catch (error) {
        res.status(500).json({ message: "catch error " + error })
    }
}

export const signIn = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await userModel.findOne({ email })
        if (!user) {
            res.status(400).json({ message: "Email does not exist, please signup" })
        } else {
            if (!user.confirmEmail) {
                res.status(400).json({ message: "please confirm" })
            } else {
                if (user.blocked) {
                    res.status(400).json({ message: "blocked account" })
                }
                else {
                    let match = await bcrypt.compare(password, user.password)
                    if (!match) {
                        res.status(400).json({ message: "wrong password" })
                    }
                    else {
                        res.status(400).json({ message: "Done" })
                    }
                }
            }
        }
        // res.status(300).json({ message: "signIn" })
    } catch (error) {
        res.status(500).json({ message: "catch error " + error })
    }
}
