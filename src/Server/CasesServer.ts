import CasesModel from "../DBModel/CasesModel";
import GeografModel from "../DBModel/geografModel";
import TypesCasesModel from "../DBModel/TypesCasesModel";
import CasesType from "../Types/CasesType";


export const getCasesByHighNkill = async (attacktype1_txt: string[] | null[] = [null]) => {
    try {
        if(!attacktype1_txt[0]) return [];
        const mongoData: any[] = 
            await TypesCasesModel.find({
                Name: { 
                  $in: attacktype1_txt, 
                  $nin: [0, null] 
                },
               
              })
            
           
       const res = mongoData.map(x => ({name:x.Name,sum:x.Cases.length}))
       return res.sort((a,b) => b.sum - a.sum)
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

