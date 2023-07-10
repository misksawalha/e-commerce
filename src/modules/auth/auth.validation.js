import joi from 'joi'

export const  signUpValid = {

       body:joi.object().required().keys({
        userName:joi.string().required().messages({
            'any.required':'please enter your name'
        }),
        email:joi.string().email().required(),
        // password:joi.string().pattern(new RegExp(/ our expression  /))
        password:joi.string().required(),
        cPassword:joi.string().valid(joi.ref('password')).required(),
       })
}