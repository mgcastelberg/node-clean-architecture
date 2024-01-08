import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from '../dtos/auth/register-user.dto';

export abstract class AuthRepository {
    // abstract: solo sirve para ser usada para expandirla pero no puede instanciarla
    // va a tener un argumento que nos va a permitir cambiar el data source

    // ToDo:
    // abstract login():Promise<UserEntity>

    // abstract register(name: string, email: string, password: string ):Promise<UserEntity>
    abstract register( registerUserDto: RegisterUserDto ):Promise<UserEntity>

}