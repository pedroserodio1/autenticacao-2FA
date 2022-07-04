export default class AppError{
    public status: string;
    public code: number;

    constructor (status: string, code = 400){
        this.status = status;
        this.code = code;
    }
}