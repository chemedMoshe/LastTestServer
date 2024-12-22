import fs from 'fs';
import CasesModel from '../DBModel/CasesModel';
import YearsModel from '../DBModel/YearsMosel';
import { log } from 'console';
import OrganisationModel from '../DBModel/OrganisationModel';
import geografModel from '../DBModel/geografModel';
import TypesCasesModel from '../DBModel/TypesCasesModel';

const data: any[] = JSON.parse(fs.readFileSync("./public/data/data.json", 'utf8'));
const years = {};
const organization = {};
const catys = {};
export const sid = async () => {
    try {
        const isExist = await CasesModel.findOne({});
        if (isExist) return;
        data.map(async x => {
            await CasesModel.create(x);
        });

    } catch (error) {
        console.log(error);

    }
};

export const sidByYears = async () => {
    try {
        const isExist = await YearsModel.findOne({});
        if (isExist) return;

        const mongoData: any[] = await CasesModel.find({});
        
        mongoData.map(x => {
            //@ts-ignore
            years[x.iyear] = 0;
        });
        for (let y in years) {
            const ids = mongoData.filter(x => x.iyear == y)
                .map(x => x._id);
            await YearsModel.create({ iyear: +y, caces: ids });
        }

    } catch (error) {
        console.log(error);

    }
};

export const sidOrganization = async()=>{
    const isExist = await OrganisationModel.findOne({});
    if(isExist) return;
    const mongoData: any[] = await CasesModel.find({});
    
    mongoData.map(x => {
        //@ts-ignore
        organization[x.gname] = 0;
    });
    for (let o of Object.keys(organization)) {
        const ids = mongoData.filter(x => x.gname == o)
            .map(x => x._id);
        await OrganisationModel.create({ name: o, caces: ids });
    }
    
}

export const sidCantry = async () => {
    try {
        const isExist = await geografModel.findOne({});
        if (isExist) return;
        const mongoData: any[] = await CasesModel.find({});
       const sort = mongoData.sort((a, b) => {
            const totalCasualtiesA = (a.nkill || 0) + (a.nwound || 0); 
            const totalCasualtiesB = (b.nkill || 0) + (b.nwound || 0); 
          
            return totalCasualtiesB - totalCasualtiesA;
          });
          log(sort[0])
        //@ts-ignore
        sort.map(x => catys[x.country_txt] = x.region_txt);
        for (let g of Object.keys(catys)) {
            const ids = sort.filter(x => x.country_txt == g)
                .map(x => x._id);
            await geografModel.create({ name: g, caces: ids });
        }
    } catch (error) {
        console.log(error);

    }
};
export const sidTypeCases = async()=>{
    const data = await CasesModel.find({})
    const types = {}
    data.filter(x => x.attacktype1_txt != "Unknown")
    .forEach(x => {
        types[x.attacktype1_txt]= 0
    })
    for(let c of Object.keys(types)){
const ids = data.filter(x => x. attacktype1_txt === c)
.map(x => x._id)
types[c] = ids
await TypesCasesModel.create({Name:c,Cases:ids})
    }
    log(types)
}
export const check = async () => {
    const isExist = await CasesModel.find({});
    console.log(isExist.filter(x => x.attacktype1_txt).length);
}
