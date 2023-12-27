import { Request, Response } from "express"

export class AuthController {
    // DI:Inyeccion de dependencias
    constructor(){}

    loginUser = async (req: Request, res:Response) => {
        res.json('loginUser');
    }
    
    registerUser = async (req: Request, res:Response) => {
        res.json('registerUser');
    }
}
