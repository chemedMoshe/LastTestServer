import YearsMosel from "../DBModel/YearsMosel";
import YearType from "../Types/YearType";

export const acountCasesByYears =async(startYear:number,endYear:number|null = null)=>{
    const data:any = {}
    const caces = !endYear ?  await YearsMosel.findOne({iyear:startYear}):
    await YearsMosel.find({iyear:{$gte:startYear,$lte:endYear}})

    endYear && (caces as [])?.map((x:YearType) => {
    if(! data[x.iyear]) data[x.iyear] = 0
    
    data[x.iyear] += x.caces.length
})

    if(!endYear){
     data[startYear]= (caces as YearType).caces.length;
    }
 
    return data
}


