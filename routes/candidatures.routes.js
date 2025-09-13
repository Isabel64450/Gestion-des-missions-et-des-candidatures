import {Router} from "express";
import authentificationToken from "../middlewares/midd.authenticate.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";


export function candidaturesRouter(candidaturesController){
const router = Router();
router.post("/create",authentificationToken,authorizeRoles("benevole"), (req,res, next) => candidaturesController.createCandidature(req,res,next));
router.get('/mes-candidatures',authentificationToken,authorizeRoles("benevole"),(req,res,next)=>candidaturesController.getCandidaturesForBenevole(req, res,next));
router.get('/pending',authentificationToken,authorizeRoles("association"),(req,res,next)=>candidaturesController.getAllPendingCandidatures(req,res,next));
router.put('/:id',authentificationToken,authorizeRoles("association"), (req, res,next) => candidaturesController.updateCandidatureStatus(req, res,next));  
router.get('/mes-pendings',authentificationToken,authorizeRoles("association"),(req,res,next)=>candidaturesController.getPendingCandidaturesForAssociation(req, res,next));
return router;

}