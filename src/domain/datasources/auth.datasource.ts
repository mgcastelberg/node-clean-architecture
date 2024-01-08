import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from '../dtos/auth/register-user.dto';

export abstract class AuthDatasource {
    // abstract: solo sirve para ser usada para expandirla pero no puede instanciarla
    // solo va a servir para definir reglas del negocio

    // ToDo:
    // abstract login():Promise<UserEntity>

    // abstract register(name: string, email: string, password: string ):Promise<UserEntity>
    abstract register( registerUserDto: RegisterUserDto ):Promise<UserEntity>

}