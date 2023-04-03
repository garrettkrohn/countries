import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {countryResource, getCountries} from "../../services/countriesApi";
import Loading from "../../utilities/Loading";
import Error from "../../utilities/Error";
import CountryCard from "../countries/CountryCard";

const Homepage = () => {

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

        countriesData.sort((a: countryResource, b: countryResource) => a.name.common.localeCompare(b.name.common));

        return (
            <div className='grid grid-cols-4 py-2 bg-#fafafa'>
                {countriesData.map((country, index) => (
                    <div key={index} className='py-6'>
                        <CountryCard country={country} />
                    </div>
                ))}
            </div>
        );
    }

    return <div></div>;

};

export default Homepage;
