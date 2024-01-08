import { Request, Response } from "express"
import { AuthRepository, RegisterUserDto } from "../../domain";

export class AuthController {
    // DI:Inyeccion de dependencias, que depende de algo
    constructor(
        private readonly authRepository: AuthRepository // DI
    ){}

    loginUser = (req: Request, res:Response) => {
        res.json( req.body );
        // res.json('loginUser');
    }
    
    registerUser = (req: Request, res:Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({ error });

        this.authRepository.register(registerUserDto!)
            .then( user => res.json( user ))
            .catch( error => res.status(500).json({ error }) )

        // res.json(registerUserDto);
        // res.json('registerUser');
    }
}
