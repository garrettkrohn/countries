import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {getCountries} from "../../services/countriesApi";
import Loading from "../../utilities/Loading";
import Error from "../../utilities/Error";

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

    return (
        <div>
            Homepage
        </div>
    );
};

export default Homepage;
