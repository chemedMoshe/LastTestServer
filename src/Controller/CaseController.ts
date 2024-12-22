import { Request, Response } from "express";
import { getCasesByHighNkill } from "../Server/CasesServer";

export const getCases = async (req: Request, res: Response) => {
    try{
        
    const data = await getCasesByHighNkill(req.body); 
      
    res.json(data);
    }
    catch (error) {res.status(500).json({ message: (error as Error).message });}
}