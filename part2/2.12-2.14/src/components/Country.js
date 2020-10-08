import React from 'react'
import Weather from './Weather'

const Country = ({country})=> {

  return(
   <div>
      <h1>{country.name} </h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2> languages</h2>
      <ul>
       {country.languages.map( language=> 
         <li key= {language.name} > {language.name} </li>
        )} 
      </ul>
    <img  src={country.flag} alt ="flag" height={100} width ={100} />
    <div> <Weather country={country} /> </div>
    </div> 
    )
  }

  export default Country


  