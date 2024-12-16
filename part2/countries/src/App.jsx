import { useEffect, useState } from 'react'
import countryService from './service/countryService'
import Search from './components/Search'
import Country from './components/Country'
import weatherService from './service/weatherService'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleQuery = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
    setSelectedCountry(null)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (countriesToShow.length === 1 ) {
      const country = countriesToShow[0];
      handleWeather(country); 
    }
  }, [countriesToShow, weather]);

  const handleWeather = (country) => {
    // If the weather data hasn't been fetched for this country, fetch it
    if (!weather || weather.name !== country.capital) {
      weatherService
        .getWeather(country.capital)
        .then((weatherData) => {
          setWeather(weatherData);
        })
        .catch((err) => {
          console.error('Error fetching weather data:', err);
        });
    }
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country)
    handleWeather(country)
  }

  return (
    <>
      <Search query={query} handleQuery={handleQuery}/>
      <Country countries={countriesToShow} query={query} selectedCountry={selectedCountry} onShowDetails={handleShowDetails} weather={weather} />
    </>
  )
}

export default App
