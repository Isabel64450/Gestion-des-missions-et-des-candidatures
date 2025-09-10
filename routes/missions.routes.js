import {Router} from "express";


export function missionRouter(missionController){
const router = Router();
router.post("/create", (req,res) => missionController.createMission(req,res));
router.put('/update/:id',(req,res)=>missionController.updateMission(req,res));
router.delete('/delete/:id', (req, res) => missionController.deleteMission(req, res)); 
router.get('/', (req, res) => missionController.getAllMissions(req, res));
return router;

}