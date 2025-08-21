import * as SequelizePkg from "sequelize";
const { Sequelize } = SequelizePkg;



import { conn } from "../conn/conn.js"
import { PokemonUser } from "./pokemon-user.js";

export const User = conn.define(
    'User',
    {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,


    },

);
User.hasMany(PokemonUser, { foreignKey: "userId" })
