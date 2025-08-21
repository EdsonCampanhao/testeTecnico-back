import * as SequelizePkg from "sequelize";
import { Pokemon } from "./Pokemon.js";
const { Sequelize } = SequelizePkg;



import {conn} from "../conn/conn.js"
import { User } from "./User.js";
import { Goalpkm } from "./Goal-Pkm.js";

export const Goal = conn.define(
    'Goal',
    {
       
    },

);
Goal.hasMany(Goalpkm,{ foreignKey: 'goalId'})
