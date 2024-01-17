import { compareSync, hashSync } from 'bcryptjs';

// patron adaptador para usar bcrypt
export class BcryptAdapter {
    static hash( password: string ): string {
        return hashSync( password );
    }
    static compare( password: string, hashed: string ): boolean {
        return compareSync(password, hashed);
    }
}

// typscript nos da la firma que regresa la funcion si dejamos el cursor encima
const miFuncion = (password: string, hashed: string) => {
    return true;
}
