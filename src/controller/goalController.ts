import { Goal } from "../models/Goal.js";
import { Goalpkm } from "../models/Goal-Pkm.js";
import { Pokemon } from "../models/Pokemon.js";
import pkmController from "./pkmController.js";
import { pokemonFinded, pokemon, pokemonSprites } from "./pkmController.js"
type goal = {
    id: string;
    userId: string;
}
export type instanceOfModel = {
    id:number;
}
export default class goalController {
    static async newGoal(userId :number) {

        try {
            const goalOfCurrentUser = await Goal.findOne({ where: { userId: userId } }) as unknown as goal
            if (!goalOfCurrentUser) {
                const currentGoal= await Goal.create({ userId: userId }) as unknown as instanceOfModel

                const pokemonsOfGoal: pokemon[] = [];

                for (let i = 0; i < 3; i++) {
                    const type = pkmController.getRandonType();
                    const listOfPokemonsOfType = await pkmController.getPokemonsOfType(type, false);
                    const randomPokemon = await pkmController.getRandomPokemon(listOfPokemonsOfType.pokemon)
                    const sprite: pokemonSprites = await pkmController.getSpritePokemon(randomPokemon.url)

                    const currentPokemon: pokemon = {
                        name: randomPokemon.name,
                        url: sprite.sprites.front_shiny
                    }
                    pokemonsOfGoal.push(currentPokemon)
                }

                pokemonsOfGoal.map(async (pkm)=>{
                    const instancecOfPokemon = await Pokemon.create({name:pkm.name,sprite:pkm.url}) as unknown as instanceOfModel
                    await Goalpkm.create({goalId:currentGoal.id,pokemonId:instancecOfPokemon.id})
                    
                })

            }else{
                return
            }



        } catch (err) {
           throw err
        }




    }
}
