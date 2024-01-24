import { JwtAdapter } from '../../../config';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}

// definimos como funcione la firma de singtoken
type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserUseCase {
    execute( registerUserDto: RegisterUserDto ): Promise<UserToken>
}

export class RegisterUser implements RegisterUserUseCase {

    // Inyectamos la clase abstracta 
    constructor( 
        private readonly AuthRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ){

    }

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        // Crear usuario
        const user = await this.AuthRepository.register(registerUserDto);
        // token
        const token = await this.signToken({ id: user.id }, '2h');
        if( !token ) throw CustomError.internalServerError('Error generating token');

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }

        }
    }

}