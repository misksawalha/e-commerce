import userModel from './../../../../DB/model/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../../../services/email.js';
export const signUp = async (req, res) => {
    try {
        let { email, userName, password } = req.body
        
        let user = await userModel.findOne({email}).select('email')
        if(user){
            res.status(409).json({message:"Email is already exist"})
        }
        else{
             let hashPassword = await bcrypt.hash(password,parseInt(process.env.SALTROUND))
             let newUser = await new userModel({userName,email,password:hashPassword})
             let token =await jwt.sign({id:newUser._id},process.env.EMAILTOKEN,{expiresIn:'1h'});
            //  console.log(token)
             let link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}auth/confirmEmail/${token}`
             let message=`
              <a href="${link}">Confirm Email</a>
             `
             let info =await sendEmail(email,'Verify Email',message)
             res.json({message:info})
        }

    } catch (error) {
        res.status(404).json({ message: "catch error: " + error })
    }
}