import { Request, Response } from "express";
import CreateUserService from "../service/CreateUserService";
import LoginService from "../service/LoginService";
import TwoFactorVerify from "../service/TwoFactorVerifyService";

export default class UserController{
    public async create(req: Request, res: Response): Promise<Response>{
        const createUserService = new CreateUserService()

        const {name, password, TwoFactorEnabled } = req.body

        const user = await createUserService.execute({name, password, TwoFactorEnabled})

        return res.status(200).json(user)
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const loginService = new LoginService()

        const {name, password} = req.body

        const user = await loginService.execute({name, password})

        if(user.TwoFactor){
            res.cookie('verifyCode', user.verifyCode)
        }

        return res.status(200).json(user)
    }

    public async twoFactorVerify(req: Request, res: Response): Promise<Response>{

        const twoFactorVerify = new TwoFactorVerify()

        const { userCode } = req.body
        const { verifyCode} = req.cookies

        const verify = await twoFactorVerify.execute({verifyCode, userCode})

        res.clearCookie('verifyCode')

        return res.status(200).json(verify)
    }
}