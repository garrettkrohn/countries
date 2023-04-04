import React from 'react';
import {countryResource} from "../../services/countriesApi";
import {selectedCountry} from "../../services/Atoms";
import { useAtom } from 'jotai';

const CountryCard = (props: {country: countryResource}) => {
    const [countryAtom, setCountry] = useAtom(selectedCountry);

    const countrySet = () => {
        setCountry(props.country);
    }

    const {country} = props;
    const formattedPopulation = country.population.toLocaleString("en-US");
    return (
        <div className='h-72 w-48 border bg-white'>
            <img alt='flag cannot load' src={country.flag} />
            <div className='text-2xl'>
                {country.name}
            </div>
            <div>Population: {formattedPopulation}</div>
            <div>Region: {country.region}</div>
            <div>Capital: {country.capital}</div>
            <button className='bg-black text-white hover:cursor' onClick={ () => countrySet()}>select country</button>
        </div>
    );
};

export default CountryCard;
