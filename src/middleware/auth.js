import jwt from "jsonwebtoken";
import userModel from '../.././DB/model/user.model.js';
export const auth = (accessRole=[]) => {

    return async (req, res, next) => {
        try {
            let { token } = req.headers;
            if (!token.startsWith(process.env.BERARKEY)) {
                res.status(400).json({ message: "invalid berar token" })
            }
            else {
                token = token.split(process.env.BERARKEY)[1]
                let decoded = await jwt.verify(token, process.env.TOKEN)
                let user = await userModel.findById(decoded.id).select('role blocked')
                if (!user) {
                    res.status(401).json({ message: "not register user" })
                }
                else {
                    if(user.blocked){
                        res.status(400).json({message:"blocked account"})
                    }
                    else{
                        console.log(user.role)
                        if(!accessRole.includes(user.role)){
                            res.status(403).json({message:"not auth user"})
                        }
                        else{
                            req.user = user
                            next()
                        }
                    }
                 
                    
                }
            }

        } catch (error) {
            res.status(500).json({ message: "Catch error " + error })
        }
    }
}