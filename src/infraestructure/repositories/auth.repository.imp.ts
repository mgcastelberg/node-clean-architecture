import { AuthRepository, RegisterUserDto, UserEntity } from "../../domain";
import { AuthDatasource } from '../../domain/datasources/auth.datasource';

export class AuthRepositoryImp implements AuthRepository {
    
    // La idea es que en el la Imp varie y puedas definir un datasorce para que nos sirva como una capa
    constructor(
        private readonly authDatasource: AuthDatasource
    ){}
    
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register( registerUserDto );
    }
    
}