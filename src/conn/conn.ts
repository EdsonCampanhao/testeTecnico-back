import mysql from "mysql"
import dotenv from "dotenv";
import {Sequelize} from "sequelize";

dotenv.config();


const DB_NAME= process.env.DB_NAME;
const DB_HOST= process.env.DB_HOST;
const DB_USER= process.env.DB_USER;
const DB_PASSWORD= process.env.DB_PASSWORD;

console.log(process.env.DB_NAME,"rodei primeiro mesmo")



export const conn = new Sequelize(DB_NAME! , DB_USER!, "", {
  host: DB_HOST,
  dialect: 'mysql'
});
