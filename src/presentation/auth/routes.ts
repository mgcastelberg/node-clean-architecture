import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImp, AuthRepositoryImp } from "../../infraestructure";

export class AuthRoutes {
    static get routes(): Router {
       
        const router = Router();

        const datasource = new AuthDatasourceImp();

        const authRepository = new AuthRepositoryImp(datasource);

        const controller = new AuthController(authRepository);

        router.post('/login',  controller.loginUser);

        router.post('/register', controller.registerUser);

        return router;
    }
}