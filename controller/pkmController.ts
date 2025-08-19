import { Request, Response } from "express"
import weatherApiController from "./weatherAPIController.js";


type pokemonFinded = {
    pokemon: pokemon
}
type pokemon = {
    name: string;
    url: string;
}
type pokemonSprites = {
    sprites: frontSprite
}
type frontSprite = {
    front_shiny: string
}
type pokemonComplete = {
    local: string
    name: string;
    type: String;
    temp: Number;
    sprite: string;
    isRaining: boolean;
}
export default class pkmController {

    static async getPokemon(req: Request, res: Response) {

        const city = (req.query.city as string).replace(/"/g, "");

        try {
            const latLong = await weatherApiController.getLatLongInfos(city);
            console.log(latLong)
            const weatherInfos = await weatherApiController.getWeatherInfos(latLong);

            const type = pkmController.getType(weatherInfos.temp)

            const listOfAvaiablePokemons = await pkmController.getPokemonOfType(type, weatherInfos.rain)

            const findedPokemon: pokemon = await pkmController.getRandomPokemon(listOfAvaiablePokemons.pokemon)

            const spriteOfPokemon: pokemonSprites = await pkmController.getSpritePokemon(findedPokemon.url)


            const currentPokemon: pokemonComplete = {
                local: city,
                name: findedPokemon.name,
                type: type,
                temp: weatherInfos.temp,
                sprite: spriteOfPokemon.sprites.front_shiny,
                isRaining: weatherInfos.rain
            }



            return res.status(200).json(currentPokemon)

        }
        catch (err) {
            console.log(err)
            if ((err as Error).message.includes("Erro ao buscar cidade!")) { return res.status(404).json("Erro ao buscar cidade!") }
            else if ((err as Error).message.includes("Por favor, selecione uma cidade!")) { return res.status(400).json("Por favor, selecione uma cidade!") }
            else if ((err as Error).message.includes("Api are not avaiable!")) { return res.status(503).json("Api are not avaiable!") }
            else if ((err as Error).message.includes("Nenhuma cidade encontrada!")) { return res.status(503).json("Nenhuma cidade encontrada!") }

        }
    }



    static getType(temp: number) {

        if (temp < 5) { return "ice" }
        else if (temp >= 5 && temp < 10) { return "water" }
        else if (temp >= 12 && temp <= 15) { return "grass" }
        else if (temp >= 12 && temp <= 15) { return "grass" }
        else if (temp >= 15 && temp <= 21) { return "ground" }
        else if (temp >= 23 && temp <= 27) { return "bug" }
        else if (temp >= 27 && temp <= 33) { return "rock" }
        else if (temp > 33) { return "fire" }

        return "normal"

    }

    static async getPokemonOfType(type: string, weather: boolean) {
        if (weather) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/type/eletric/`)
                const data = await response.json()
                return data

            } catch (error) {
                throw new Error("Api are not avaiable!")
            }
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${type}/`)
            const data = await response.json()

            return data
        } catch (error) {
            throw new Error("Api are not avaiable!")
        }

    }
    static async getRandomPokemon(pokemonList: pokemonFinded[]) {
        const pkmNum = Math.floor(Math.random() * pokemonList.length)
        const pokemonFinded = pokemonList[pkmNum]
        return pokemonFinded.pokemon
    }
    static async getSpritePokemon(url: string) {
        try {
            const response = await fetch(url)
            const data = await response.json()

            return data

        } catch (error) {
            throw new Error("Api are not avaiable!")
        }
    }

}

