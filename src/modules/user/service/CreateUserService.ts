import AppError from "@shared/error/AppError";
import { User } from '@prisma/client'
import prisma from "@database/prismaClient";
import { hash } from 'bcryptjs'

interface IRequest{
    name: string;
    password: string;
    TwoFactorEnabled: boolean;
}

export default class CreateUserService {
    public async execute({name, password, TwoFactorEnabled}: IRequest): Promise<User>{

        const userExists = await prisma.user.findFirst({
            where:{
                name
            }
        })

        if(userExists){
            throw new AppError("User already exists")
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data:{
                name, 
                password: hashedPassword,
                TwoFactorEnabled
            }
        })

        return user

    }
}