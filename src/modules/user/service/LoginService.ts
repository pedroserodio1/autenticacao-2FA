import AppError from "@shared/error/AppError";
import prisma from "@database/prismaClient";
import { compare } from 'bcryptjs'

interface IRequest{
    name: string;
    password: string;
}

interface IResponse{
    status: string;
    TwoFactor: boolean;
    verifyCode?: string
}

export default class LoginService{
    public async execute({name, password}: IRequest): Promise<IResponse>{
        const user = await prisma.user.findFirst({
            where:{
                name
            }
        })

        if(!user){    
            throw new AppError('User does not exist')
        }

        const passwordIsValid = await compare(password, user.password)

        if(!passwordIsValid){
            throw new AppError('Password is not valid')
        }

        if(user.TwoFactorEnabled){

            const verifyCode = Math.random().toString(24).substring(0, 8).split('.').join('').replace('0', '').toUpperCase()

            return {
                status: 'Verifique o codigo enviado em seu email para confirmar o login',
                TwoFactor: true,
                verifyCode: verifyCode
            }
        }

        return {
            status: 'logado',
            TwoFactor: false
        }
    }
}