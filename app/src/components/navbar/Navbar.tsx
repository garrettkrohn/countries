import { useAtom } from 'jotai';
import React from 'react';
import {selectedCountry} from "../../services/Atoms";

const Navbar = () => {
    const [country] = useAtom(selectedCountry);
    return (
        <div className='flex border'>
            <div className='text-2xl'>Where in the world?</div>
            <div>{country ? <div>You are in {country.name.common}</div> : ''}</div>
        </div>
    );
};

export default Navbar;
