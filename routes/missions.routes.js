import {Router} from "express";
import authentificationToken from "../middlewares/midd.authenticate.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";


export function missionRouter(missionController){
const router = Router();
router.post("/create",authentificationToken,authorizeRoles("association"), (req,res) => missionController.createMission(req,res));
router.put('/update/:id',authentificationToken,authorizeRoles("association"),(req,res)=>missionController.updateMission(req,res));
router.delete('/delete/:id',authentificationToken,authorizeRoles("association"), (req, res) => missionController.deleteMission(req, res)); 
router.get('/',authentificationToken,authorizeRoles("benevole","association"), (req, res) => missionController.getAllMissions(req, res));
router.get('/mes-missions',authentificationToken,authorizeRoles("association"),(req,res)=>missionController.getMissionsByAssociation(req,res));
return router;

}