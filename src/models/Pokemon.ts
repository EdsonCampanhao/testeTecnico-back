import * as SequelizePkg from "sequelize";
const { Sequelize } = SequelizePkg;



import {conn} from "../conn/conn.js"
import { Goal } from "./Goal.js";
import { PokemonUser } from "./pokemon-user.js";
import { Goalpkm } from "./Goal-Pkm.js";

export const Pokemon = conn.define(
    'Pokemon',
    {
        name: Sequelize.STRING,
        sprite:  Sequelize.STRING,
    },

);
Pokemon.hasMany(PokemonUser,{ foreignKey: 'userId'})
Pokemon.hasMany(Goalpkm,{ foreignKey: 'pokemonId'})