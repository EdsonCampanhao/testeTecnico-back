import * as SequelizePkg from "sequelize";
const { Sequelize } = SequelizePkg;



import {conn} from "../conn/conn.js"
import { PokemonUser } from "./pokemon-user.js";

export const Pokemon = conn.define(
    'Pokemon',
    {
        name: Sequelize.STRING,
        sprite:  Sequelize.STRING,
    },

);
Pokemon.hasMany(PokemonUser,{ foreignKey: 'pokemonId'})
