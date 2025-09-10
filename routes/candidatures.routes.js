import {Router} from "express";


export function candidaturesRouter(candidaturesController){
const router = Router();
router.post("/create", (req,res) => candidaturesController.createCandidature(req,res));
router.get('/pending',(req,res)=>candidaturesController.getAllPendingCandidatures(req,res));
router.put('/:id', (req, res) => candidaturesController.updateCandidatureStatus(req, res));  

return router;

}