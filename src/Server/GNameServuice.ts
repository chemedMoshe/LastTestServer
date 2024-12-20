import CasesModel from "../DBModel/CasesModel";
import YearsMosel from "../DBModel/YearsMosel";
import CasesType from "../Types/CasesType";
import CantryModel from "../DBModel/geografModel";
interface Element {
    org: string,
    sum: number;
}

interface GnameType {
    caces: any[];
}



export const getBoldGnameByCantry = async (cantry: string, amount: number | null = null) => {
    const organisation: Element | any = {};
    const organisationList: Element[] | any = [];
    const data: CasesType[] = await CasesModel.find({ country_txt: cantry });
    data.map((x: CasesType) => {
        if (!organisation[x.gname]) { organisation[x.gname] = 0; }
        organisation[x.gname] += 1;
    });
    Object.entries(organisation).forEach(([org, sum]) => organisationList.push({ org, sum }));
    const sortList = organisationList.sort((a: any, b: any) => b.sum - a.sum);
    return sortList.slice(0, amount || organisationList.length - 1);
};

export const getGnameByYear = async (year: number, Gname: string | null = null) => {
    const elements: { [key: string]: number; } = {};

    const data: any = await YearsMosel.findOne({ iyear: year }).populate("caces");
    data?.caces.map((x: CasesType) => {
        if (!elements[x.gname]) elements[x.gname] = 0;
        elements[x.gname] += 1;
    });
    const sortList = Object.entries(elements).sort((a: any, b: any) => b[1] - a[1]);
    const elementList = sortList.map(([x, y]) => ({ org: x, sum: y }));

    return !Gname ?
        elementList :
        elementList.filter((x: Element) => x.org == Gname);

};



export const getCasesByStrongGnameAnd = async (Gname: string) => {

    const data = await CantryModel.find()
        .populate({
            path: 'caces',
            match: { gname: Gname },
            options: { sort: { nkill: -1 }, limit: 1 }
        });

    const cases = data.filter((x: GnameType) => x.caces[0]?.gname).map(x => {
        return { name: x.name, case: x.caces[0] };
    });
    return cases;
}

