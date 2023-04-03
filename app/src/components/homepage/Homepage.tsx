import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {countryResource, getCountries} from "../../services/countriesApi";
import Loading from "../../utilities/Loading";
import Error from "../../utilities/Error";
import CountryCard from "../countries/CountryCard";
import {selectedCountry} from "../../services/Atoms";
import { useAtom } from 'jotai';

const Homepage = () => {

    const [country, setCountry] = useAtom(selectedCountry);

    const {
        isLoading: countriesAreLoading,
        error: countriesError,
        data: countriesData,
    } = useQuery({
        queryKey: [`countries`],
        queryFn: () => getCountries(),
    });

    if (countriesAreLoading)
        return (
            <div>
                <Loading />
            </div>
        );

    if (countriesError) return <Error />;

    if (countriesData) {
        if (!country) {
            setCountry(countriesData[0]);
        }
        countriesData.sort((a: countryResource, b: countryResource) => a.name.common.localeCompare(b.name.common));

        return (
            <div className='grid grid-cols-4 py-2 bg-#fafafa'>
                {countriesData.map((country, index) => (
                    <div key={index} className='py-6'>
                        <CountryCard country={country}/>
                    </div>
                ))}
            </div>
        );
    }

    return <div></div>;

};

export default Homepage;
