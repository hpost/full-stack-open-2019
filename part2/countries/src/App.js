import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({ countries, onShow }) => countries.map(country =>
  <div key={country.name}>
    {country.name}
    <button onClick={() => onShow(country.name)}>show</button>
  </div>
)

const CountryDetails = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <ul>
      {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
    </ul>
    <img src={country.flag} height='100px' />
  </div>
)

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const onFilterChange = (event) => setFilter(event.target.value)

  const fetchCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }
  useEffect(fetchCountries, [])

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <div>
        find countries
        <input value={filter} onChange={onFilterChange} />
      </div>
      <div>{
        filteredCountries.length > 10
          ? 'Too many matches, specify another filter'
          : filteredCountries.length === 1
            ? <CountryDetails country={filteredCountries[0]} />
            : <CountryList countries={filteredCountries} onShow={(name) => setFilter(name)} />
      }
      </div>
    </div>
  )
}

export default App
