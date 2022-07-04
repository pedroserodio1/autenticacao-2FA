import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'
import router from './routes/route';
import AppError from '@shared/error/AppError';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(router)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.code).json({
            status: err.status,
            code: err.code
        })
    }
    console.error(err)
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

app.listen('3333', () => {
    console.log('Server started on port 3333🤨')
})