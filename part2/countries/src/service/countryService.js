import axios from "axios";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
    const request = axios.get(baseUrl + '/api/all')
    return request.then(resp => resp.data)    
}

const getCountry = (country) => {
    console.log(country)
    const request = axios.get(`${baseUrl}/api/name/${country}`)
    return request.then(resp => resp.data)    
}

export default { getAll, getCountry }