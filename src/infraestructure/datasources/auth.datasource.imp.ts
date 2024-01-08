import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImp implements AuthDatasource {
    // cursor encima de la clase mas Ctrl + . permite implementar la clase
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto;

        try {

            // 1. Verificar si el correo existe
                // if ('jmgc@virket.com'=== email) {
                //     throw CustomError.badRequest('Correo ya existe');
                // }
            // 2. Hash de contraseña
            // 3. Mapear la respuesta a nuestra entidad
            return new UserEntity(
                '1',
                name,
                email,
                password,
                ['ADMIN_ROLE']
            )
            
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServerError();
        }
        
        // throw new Error("Method not implemented.");
    }

}