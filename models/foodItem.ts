import mongoose from "mongoose";

const {Schema}= mongoose 
const foodItemSchema= new Schema({
    title:{type:String, required:true},
    desc:{type:String, required:true},
    date:{type:Date, default:Date.now},
    imgSrc:{type:String, required:true},
    content:{type:String, required:true},
    
})

export default mongoose.models.foodItem || mongoose.model("foodItem", foodItemSchema)