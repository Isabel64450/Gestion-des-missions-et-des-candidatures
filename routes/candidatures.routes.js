import {Router} from "express";
import authentificationToken from "../middlewares/midd.authenticate.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";


export function candidaturesRouter(candidaturesController){
const router = Router();
router.post("/create",authentificationToken,authorizeRoles("benevole"), (req,res) => candidaturesController.createCandidature(req,res));
router.get('/mes-candidatures',authentificationToken,authorizeRoles("benevole"),(req,res)=>candidaturesController.getCandidaturesForBenevole(req, res));
router.get('/pending',authentificationToken,authorizeRoles("association"),(req,res)=>candidaturesController.getAllPendingCandidatures(req,res));
router.put('/:id',authentificationToken,authorizeRoles("association"), (req, res) => candidaturesController.updateCandidatureStatus(req, res));  
router.get('/mes-pendings',authentificationToken,authorizeRoles("association"),(req,res)=>candidaturesController.getPendingCandidaturesForAssociation(req, res));
return router;

}