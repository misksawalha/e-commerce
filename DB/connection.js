import mongoose from "mongoose";

const connectDB=async()=>{
    return await mongoose.connect(process.env.DBURI).then(res=>{
        console.log("Connected with DB")
    }).catch(error=>{
        console.log(`fail to connect with DB...${error}`)
    })
}

export default connectDB