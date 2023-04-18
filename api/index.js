import 'dotenv/config'
import connection from '../db/connection.js'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRouter from '../routes/auth.js'
import productRouter from '../routes/product.js'
import userRouter from '../routes/userRoute.js'

const app = express()

app.use(cors({ origin: true, credentials: true }));
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/auth/', authRouter)
app.use('/api/product/', productRouter)
app.use('/api/user/', userRouter)

export default app