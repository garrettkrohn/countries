import React from 'react';
import {countryResource} from "../../services/countriesApi";

const CountryCard = (props: {country: countryResource}) => {
    const {country} = props;
    const formattedPopulation = country.population.toLocaleString("en-US");
    return (
        <div className='h-72 w-48 border bg-white'>
            <img alt={country.flags.alt} src={country.flags.png} />
            <div className='text-2xl'>
                {country.name.common}
            </div>
            <div>Population: {formattedPopulation}</div>
            <div>Region: {country.region}</div>
            <div>Capital: {country.capital}</div>
        </div>
    );
};

export default CountryCard;
