
const Country = ({countries, query, selectedCountry, onShowDetails, weather}) => {

    if(query === '') {
        return null 
    }

    if(countries.length > 10) {
        return (
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
    } 

    if (countries.length === 1 || selectedCountry) {
        const country = selectedCountry || countries[0]
        return (
            <>
                {/* {countries.map (country => ( */}
                    <div key={country.name.common}>
                        <h2>{country.name.common}</h2>
                        <p>capital {country.capital}</p>
                        <p>area {country.area}</p>

                        <h3>languages:</h3>
                        <ul>
                            {Object.entries(country.languages).map(([code, language]) => (
                                <li key={code}>{language}</li>
                            ))}     
                        </ul>
                        <img src={country.flags['png']} alt="" />
                        <h2>Weather in {country.capital[0]}</h2>
                        {weather ? (
                            <>
                            <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p> 
                            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" /> 
                            <p>Wind: {weather.wind.speed} m/s</p>
                            </>
                        ) : (
                            <p>Loading weather data...</p>
                        )}
                    </div>
                {/* ))} */}
            </>
        )
    }
    return (
        <>
            <ul>
            {countries.map(country => (
                <li key={country.name.common}>
                {country.name.common}
                <button onClick={() => onShowDetails(country)}>show</button>
                </li>
            ))}
            </ul>
        </>
    )
}

export default Country