import mongoose ,{Schema} from "mongoose";

const userSchema = new mongoose.Schema({
      userName:{
        type:String,
        required:[true,'user name is required'],
        min :[3,'min length is 3'],
        max:[25,'max length is 25']
      },
      email:{
        type:String,
        required:true,
        unique:[true,'This email is already exist'],
      },
      password:{
        type:String,
        required:[true,'The password is required'],
      },
      phone:{
        type:String
      },
      role:{
        type:String,
        enum:['user','admin'],
        default:'user'
      },
      confirmEmail:{
        type:Boolean,
        default:false
      },
      blocked:{
        type:Boolean,
        default:false
      },
      image:String,
      whishList:[{
         type:Schema.Types.ObjectId,
         ref:'product'
      }]
},{timestamps:true})

const userModel = mongoose.model('user',userSchema)

export default userModel