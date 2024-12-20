import mongoose from "mongoose";
const geoSchema = new mongoose.Schema({
    name: String,
    caces: [{type: mongoose.Schema.Types.ObjectId,ref:"Cases"}],
    
});

export default mongoose.model("Geograf", geoSchema);