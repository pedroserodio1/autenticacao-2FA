import AppError from "@shared/error/AppError";

interface IRequest{
    verifyCode: string;
    userCode: string;
}

interface IResponse{
    status: string
}

export default class TwoFactorVerify{
    public async execute({verifyCode, userCode}: IRequest): Promise<IResponse>{

        if(!(verifyCode === userCode)){
            throw new AppError('Codigo Invalido', 401)
        }

        return {
            status: 'Logado'
        }

    }
}