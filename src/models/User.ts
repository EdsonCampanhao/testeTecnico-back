import * as SequelizePkg from "sequelize";
const { Sequelize } = SequelizePkg;



import {conn} from "../conn/conn.js"

export const User = conn.define(
    'User',
    {
        name: Sequelize.STRING,
        email:  Sequelize.STRING,
        password:  Sequelize.STRING,
        

    },

);

