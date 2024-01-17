import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

// por que un type y no una funcion: cuando es mas un tipo de dato
type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImp implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ){}

    // cursor encima de la clase mas Ctrl + . permite implementar la clase
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto;

        try {

            // 1. Verificar si el correo existe
            const exists = await UserModel.findOne({ email: email});
            if (exists) throw CustomError.badRequest('User already exist');
            
            // 2. Hash de contraseña
            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword( password )
            });
            
            await user.save();

            // 3. Mapear la respuesta a nuestra entidad

            //Todo: falta un mapper
            return UserMapper.userEntityFromObject(user);
            
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServerError();
        }
        
        // throw new Error("Method not implemented.");
    }

}