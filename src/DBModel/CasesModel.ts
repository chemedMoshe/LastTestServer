import mongoose from "mongoose";
const caseSchema = new mongoose.Schema({
    eventid: Number,
    iyear: Number,
    imonth: Number,
    iday: Number,
    country_txt: String,
    region_txt: String,
    city: String,
    latitude: Number,
    longitude: Number,
    attacktype1_txt: String,
    targtype1_txt: String,
    target1: String,
    gname: String,
    weaptype1_txt: String,
    nkill: {
        type:Number,
        default:0
    },
    nwound:{
        type:Number,
        default:0
    }
});

export default mongoose.model("Cases", caseSchema);