import userRouter from '@modules/user/routes/user.routes'
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.send('Hello world')
})

router.use('/user', userRouter)

export default router