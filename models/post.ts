import mongoose from "mongoose";

const {Schema}= mongoose 
const postSchema= new Schema({
    title:{type:String, required:true},
    desc:{type:String, required:true},
    date:{type:Date, default:Date.now},
    imgSrc:{type:String, required:true},
    
    
})

export default mongoose.models.post || mongoose.model("post", postSchema)