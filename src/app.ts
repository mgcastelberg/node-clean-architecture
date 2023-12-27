import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


// funcion anonima autoinvocada
(()=>{
    main();
})()

async function main(){
    // console.log('Hola mundo Main');
    // todo: await base de datos
    // todo: inicio de nuestro server
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start();
}