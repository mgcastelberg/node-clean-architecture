import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


// funcion anonima autoinvocada
(()=>{
    main();
})()

async function main(){
    // console.log('Hola mundo Main');
    // todo: await base de datos
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    });
    // todo: inicio de nuestro server
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start();
}