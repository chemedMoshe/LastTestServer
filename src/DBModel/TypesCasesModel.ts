import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema({
    Name:String,
Cases:[mongoose.Schema.Types.ObjectId],
})

export default mongoose.model("Types",TypeSchema)