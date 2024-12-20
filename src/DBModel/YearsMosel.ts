import mongoose from "mongoose";
const yearSchema = new mongoose.Schema({
    iyear: Number,
    caces:{
        type: [mongoose.Schema.Types.ObjectId], ref:"Cases",
        default: []
    }
});

export default mongoose.model("Years", yearSchema);