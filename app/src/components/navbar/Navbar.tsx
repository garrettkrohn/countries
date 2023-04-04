import { Link } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import React from 'react';
import {selectedCountry} from "../../services/Atoms";
import {routes} from "../../utilities/Constants";

const Navbar = () => {
    const [country] = useAtom(selectedCountry);
    return (
        <div className='flex border justify-evenly'>
            <Link to={routes.BASE} search={{}} params={{}}>Homepage</Link>
            <Link to={routes.COUNTRY} search={{}} params={{}}>Country Page</Link>
            {country ?
                <img className='h-12' alt='flag could not load' src={country.flag} />
            : ''
            }
        </div>
    );
};

export default Navbar;
