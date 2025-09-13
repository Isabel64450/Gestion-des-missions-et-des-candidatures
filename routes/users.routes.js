import {Router} from "express";
import validate from "../middlewares/midd.validate.js";
import registerSchema from "../validation.schemas/register.schema.js"
import loginSchema from "../validation.schemas/login.schema.js";
export function userRouter(userController){
const router = Router();
router.post("/register",validate(registerSchema), (req,res,next) => userController.createUser(req,res,next));
router.post('/login',validate(loginSchema),(req,res,next)=>userController.loginUser(req,res,next));
router.get('/logout', (req, res) => userController.logoutUser(req, res));

return router;

}