import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import {userRouter} from "./routes/users.routes.js"
import getPool from './services/mariadb.pool.js'
import {initDependencies} from './dependencies/initDependencies.js'
import { missionRouter } from './routes/missions.routes.js'
import { candidaturesRouter } from './routes/candidatures.routes.js'
import errorHandler from './middlewares/handling.errors.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())


const pool = getPool()
const{userController, missionController, candidaturesController}=initDependencies(pool)

app.use('/users', userRouter(userController))
app.use('/missions',missionRouter(missionController))
app.use('/candidatures', candidaturesRouter(candidaturesController))

app.use(errorHandler)




app.listen(process.env.CLIENT_URL,()=>{
    console.log(`Server in running at http://localhost:${process.env.CLIENT_URL}`)
})