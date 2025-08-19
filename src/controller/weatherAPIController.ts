


export default class weatherApiController {

    static async getLatLongInfos(city: string) {

        const apiKey = process.env.Api_key_geo;

        if (!city) {
            throw new Error("Por favor, selecione uma cidade!");
        }



        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},BR&appid=${apiKey}`)
            const data = await response.json()

            if (data.length == 0) {
                console.log(data)
                throw new Error("Nenhuma cidade encontrada!")
            }
            return data[0]
        } catch (err) {
            if ((err as Error).message.includes("Nenhuma cidade encontrada!")) {
                throw new Error("Nenhuma cidade encontrada!")
            }
            throw new Error("Erro ao buscar cidade!")
        }
    }
    static async getWeatherInfos(latLongInfos: any) {
        type latLong = {
            lat: Number;
            lon: Number;
        }

        const currentGeoInfos: latLong = {
            lat: latLongInfos.lat,
            lon: latLongInfos.lon
        }

        const apiKey = process.env.Api_key_geo;

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentGeoInfos.lat}&lon=${currentGeoInfos.lon}&units=metric&appid=${apiKey}`);
            const data = await response.json();



            const weatherInfos = {
                local: data.name,
                temp: Math.round(data.main.temp),
                rain: data.weather.main == "Rain" ? true : false
            }

            return weatherInfos;
        } catch {
            throw new Error("Api are not avaiable!")
        }
    }

}
