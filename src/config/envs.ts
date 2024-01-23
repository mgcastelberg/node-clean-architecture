import 'dotenv/config';
import { get } from 'env-var';

// Este archivo sirve como un patron adaptador, para no depender de las librerias en lo largo del proyecto
export const envs = {
    PORT: get('PORT').required().asPortNumber(),

    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

    JWT_SEED: get('JWT_SEED').required().asString(),
}