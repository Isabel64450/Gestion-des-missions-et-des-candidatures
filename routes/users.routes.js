import {Router} from "express";


export function userRouter(userController){
const router = Router();
router.post("/register", (req,res) => userController.createUser(req,res));
router.post('/login',(req,res)=>userController.loginUser(req,res));
router.get('/logout', (req, res) => userController.logoutUser(req, res));

return router;

}