import mongoose from "mongoose";

export default interface YearType {
    iyear: number,
    caces:mongoose.Types.ObjectId[]
}