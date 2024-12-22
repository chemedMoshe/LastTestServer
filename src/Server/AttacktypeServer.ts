import CasesModel from "../DBModel/CasesModel";

export const getAllTypeAttack = async () => {
    const data = await CasesModel.find({}).distinct("attacktype1_txt");
    return data
};