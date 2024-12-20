import CasesModel from "../DBModel/CasesModel";
import GeografModel from "../DBModel/geografModel";
import CasesType from "../Types/CasesType";


export const getCasesByHighNkill = async (attacktype1_txt: string[] | null = null) => {
    try {
        const mongoData: any[] = attacktype1_txt ?
            await CasesModel.find({
                attacktype1_txt: { 
                  $in: attacktype1_txt,  // סינון לפי הערכים במערך
                  $nin: [0, null]    // סינון את הערכים 0 ו-null בשדה attacktype1_txt
                },
                nwound: { $nin: [0, null] },  // סינון את הערכים 0 ו-null בשדה field1
                nkill: { $nin: [0, null] }   // סינון את הערכים 0 ו-null בשדה field2
              })
            :
            await CasesModel.find({$and: [
                //@ts-ignore
                { nwound: { $ne: 0, $ne: null } },
                //@ts-ignore
                { nkill: { $ne: 0, $ne: null } }
              ]
            });
        console.log(
         mongoData.sort((x, y) => y.nkill - x.nkill).slice(mongoData.length - 10, mongoData.length-1)
        )
        }
    catch (error) {
        throw new Error((error as Error).message);
    }
};

export const getSumCasualties = async (country_txt: string | null = null) => {
    try {
        const data:any ={}
        const mongoData: any|any[] = country_txt ?
            await GeografModel.findOne({name: country_txt }).populate("caces")
            :
            await CasesModel.find({});
        country_txt && mongoData.caces.map((x:CasesType) => {
        if(!data[country_txt]){    
            data[country_txt] = { sum:0, lon:x.longitude,lat:x.latitude}
        } 
            data[x.country_txt].sum += (x.nkill + x.nwound)
            return data
        })

        !country_txt && mongoData.forEach( (x:CasesType) =>{ 
                if(!data[x.country_txt]){
                    data[x.country_txt] = { sum:0, lon:x.longitude,lat:x.latitude}
                } 
                data[x.country_txt].sum += (x.nkill + x.nwound)
        })
        
        return data;
        
    }
    catch (error) {
        throw new Error((error as Error).message);
    }
};

