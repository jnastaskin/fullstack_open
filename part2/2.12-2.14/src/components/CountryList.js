import React  from 'react'
import Country from './Country'


const CountryList = ({countries}) => {

 const [showInfo,setShowInfo] = React.useState(false)

    return(
   <div>
   {countries.name}   <button onClick={()=>setShowInfo(true)}> show </button>
   {showInfo &&  <Country key = {countries.numericCode} countries = {countries} /> }
    </div> 
    )
}
  export default CountryList


  //<Button handleClick={showCountry(props.countries)} text="show" />
  //<Country key = {props.countries.numericCode} countries = {props.countries} /> 
