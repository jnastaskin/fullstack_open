
import React from 'react'
import Country from './Country'
import CountryList from './CountryList'

const HandleMatchNumber = (props) =>{

    if(props.matches >10){
        return (
        <div> Too many matches, specify another filter</div>)
    }
    else if (props.matches>1 && props.matches<=10){
        return(<div>
         {props.countriesToShow.map(country => 
         <CountryList key = {country.numericCode} countries = {country} />  
         )} 
        </div>)
    }
    else if (props.matches ===1 ){
        return(<div> 
            {props.countriesToShow.map(country => 
         <Country key = {country.numericCode} country = {country} />
         )} 
         </div>)
    }
    else {
        return(<div> no matches </div>)
    }
}
  export default HandleMatchNumber