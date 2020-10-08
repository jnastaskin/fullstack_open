import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component for displaying weather information of a country

const Weather = ({country}) => {
    const [weatherObject, setWeatherObject] = useState(null);

    // Fetch weather information from API
    useEffect(() => {
        const params = {
            access_key: '41937578ed1b65dffcff2a377ad69c6d',
            query: country.capital
        };

        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => setWeatherObject(response.data.current));
    }, [country]);

    return (
        <div>
        <h2>Weather in {country.capital}</h2>
            {
                weatherObject ?
                <>
                    <p><strong>Temperature:</strong> {weatherObject.temperature} celcius</p>
                    <img src={weatherObject.weather_icons[0]} alt='Weather icon' />
                    <p><strong>Wind:</strong> {weatherObject.wind_speed} mph, direction {weatherObject.wind_dir}</p>
                </>
                :
                <p>Loading...</p>
            }
        </div>
    );
};

export default Weather;