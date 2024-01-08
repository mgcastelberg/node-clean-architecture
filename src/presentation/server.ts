import express, { Router } from 'express';

interface Options{
    port?: number;
    routes: Router;
}

// Nuestras clases deben de ser Abiertas a su expansion pero cerradas a su modificacion
export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options){
        const { port = 3100, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start(){

        // Middlewares
        this.app.use(express.json()); //permite recibir data: raw
        this.app.use(express.urlencoded({extended:true})); //permite recibir data: x-www-form-urlencoded

        // Inicializar las rutas
        this.app.use(this.routes);

        this.app.listen(this.port,()=>{
            console.log(`Server running on port ${ this.port }`);
        })
    }
}