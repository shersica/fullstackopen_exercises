import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (capital) => {
    console.log(capital)
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
    return request.then(resp => resp.data)    
}

export default { getWeather }