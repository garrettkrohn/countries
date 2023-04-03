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
            <img className='h-12' alt={country.flags.alt} src={country.flags.png} />
        </div>
    );
};

export default Navbar;
