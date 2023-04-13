import { Link } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import React from 'react';
import {selectedCountry, selectedUser} from "../../services/Atoms";
import {routes} from "../../utilities/Constants";

const Country = () => {
    const [country, setCountry] = useAtom(selectedCountry);
    const [user] = useAtom(selectedUser);

    if (!country) {
        return (
            <Link to={routes.BASE} search={{}} params={{}}>Please select a country!</Link>
            )
    }

    const formattedPopulation = country.population.toLocaleString("en-US");

    return (
        <div style={{backgroundColor: user.backgroundColor}}>
            <div>
                Your selected country is: {country.name}
            </div>
            <div>Region: {country.region}</div>
            <div>Population: {formattedPopulation}</div>
            <img alt='flag could not load' src={country.flag} />
        </div>


    );
};

export default Country;
