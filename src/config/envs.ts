import 'dotenv/config';
import { get } from 'env-var';

// Este archivo sirve como un patron adaptador, para no depender de las librerias en lo largo del proyecto
export const envs = {
    PORT: get('PORT').required().asPortNumber(),
}