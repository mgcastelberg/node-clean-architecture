import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { error } from "console";

export class AuthController {
    // DI:Inyeccion de dependencias, que depende de algo
    constructor(
        private readonly authRepository: AuthRepository // DI
    ){}

    private handleError = ( error: unknown, res: Response ) => {

        if( error instanceof CustomError ){
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log('error');

        return res.status(500).json({ error: 'Internal Server Error'});
    }

    loginUser = (req: Request, res:Response) => {
        res.json( req.body );
        // res.json('loginUser');
    }
    
    registerUser = (req: Request, res:Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({ error });

        this.authRepository.register(registerUserDto!)
            .then( user => res.json( user ))
            .catch( error => this.handleError( error, res ) );

        // res.json(registerUserDto);
        // res.json('registerUser');
    }
}
