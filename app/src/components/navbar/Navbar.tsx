import { Link } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import React from 'react';
import {selectedCountry, selectedUser} from "../../services/Atoms";
import {routes} from "../../utilities/Constants";

const Navbar = () => {
    const [country] = useAtom(selectedCountry);
    const [user] = useAtom(selectedUser);
    return (
        <div className={`flex border justify-evenly`} style={{backgroundColor: user.backgroundColor}}>
            <Link to={routes.BASE} search={{}} params={{}}>Homepage</Link>
            <Link to={routes.COUNTRY} search={{}} params={{}}>Country Page</Link>
            <Link to={routes.USER} search={{}} params={{}}>User Page</Link>
            {country ?
                <img className='h-12' alt='flag could not load' src={country.flag} />
            : ''
            }
        </div>
    );
};

export default Navbar;
