import {Router} from "express";
import authentificationToken from "../middlewares/midd.authenticate.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/midd.validate.js";
import createMissionSchema from "../validation.schemas/missions.create.schema.js";

export function missionRouter(missionController){
const router = Router();
router.post("/create",authentificationToken,authorizeRoles("association"),validate(createMissionSchema), (req,res,next) => missionController.createMission(req,res,next));
router.put('/update/:id',authentificationToken,authorizeRoles("association"),(req,res,next)=>missionController.updateMission(req,res,next));
router.delete('/delete/:id',authentificationToken,authorizeRoles("association"), (req, res,next) => missionController.deleteMission(req, res,next)); 
router.get('/',authentificationToken,authorizeRoles("benevole","association"), (req, res,next) => missionController.getAllMissions(req, res,next));
router.get('/mes-missions',authentificationToken,authorizeRoles("association"),(req,res,next)=>missionController.getMissionsByAssociation(req,res,next));
return router;

}