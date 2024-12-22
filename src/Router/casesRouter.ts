import exp from 'express'
import { getCasesByHighNkill } from '../Server/CasesServer';
import { getCases } from '../Controller/CaseController';

const router = exp.Router()

router.post('/deadliest-attack-types/',getCases)
export default router