import { Router } from 'express'
import UserController from '../controller/UserController'

const userRouter = Router()
const userController = new UserController()

userRouter.post('/', userController.create)
userRouter.post('/login', userController.login)
userRouter.post('/verifyCode', userController.twoFactorVerify)

export default userRouter