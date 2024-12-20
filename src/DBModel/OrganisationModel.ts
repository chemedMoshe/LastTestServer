import mongoose from "mongoose";
const orgSchema = new mongoose.Schema({
    name: String,
    caces:{
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
});

export default mongoose.model("Organisation", orgSchema);