import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { error } from "console";

export class AuthMiddleware {
    // Como convertimos nuestra respuesta de JWT en promesa usamos async/await
    static validateJWT = async( req: Request, res: Response, next: NextFunction) => {

        console.log('Pasó por el middleware');

        const authorization = req.header('Authorization');
        if( !authorization ) res.status(401).json({ error: 'No token Provided'});
        if( !authorization?.startsWith('Bearer ') ) res.status(401).json({ error: 'Invalid bearer token'});

        const token = authorization?.split(' ').at(1) || '';

        try {
            // todo:
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if( !payload ) return res.status(401).json({ error: 'Invalid token' });

            const user = await UserModel.findById(payload.id);
            if ( !user ) return res.status(401).json({ error: 'Invalid token - user not found'});

            // req.body.token = token;
            // req.body.payload = payload;
            req.body.user = user;

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Internal Server Error'});
        }

    }
}