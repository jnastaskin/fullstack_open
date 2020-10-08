import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import HandleMatchNumber from './HandleMatchNumber'
import axios from 'axios'


const App = () => {
    
  const [countries,setCountries] = useState([])
  const [filter,setFilter] = useState('')

useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLocaleLowerCase()));

  const matches = countriesToShow.length;

  const handleFilterChange= (event) => {
    setFilter(event.target.value)
  }

    return ( 
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <HandleMatchNumber matches={matches} countriesToShow={countriesToShow} />
         ...
     <div>debug: </div>
      </div>
    )
    }
    
    export default App