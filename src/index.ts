import exp from 'express';
import 'dotenv/config';
import { ConnectDB } from './config/connectDB';
import {getCasesByStrongGnameAnd, getGnameByYear } from './Server/GNameServuice';
import { sidCantry } from './Server/sid';
import { getSumCasualties } from './Server/CasesServer';

const app = exp();

ConnectDB();

//sid();
//sidByYears()
//sidOrganization();
//sidCantry()
//check()
//getSumCasualties()
//getSumCasualties()
//getBoldGname("Brazil",5)
//getGnameByYear(1971,"Unknown")
getCasesByStrongGnameAnd("Unknown")
const PORT = process.env.PORT || 3000
app.use(exp.json());


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);});