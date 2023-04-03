export interface countryResource {
    name: {
        common: string;
        official: string;
        NativeName: {}
    },
    currencies: {},
    capital: string,
    region: string,
    subregion: string,
    languages: {},
    landlocked: boolean,
    area: number,
    maps: {
        googleMaps: string
    },
    population: number,
    timezones: [
        string
    ],
    continents: [
        string
    ],
    flags: {
        png: string,
        svg: string,
        alt: string
    }

}

export async function getCountries(): Promise<countryResource[]> {
    const url ='https://restcountries.com/v3.1/all';
    return await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    })
        .then(response => response.json())
        .then((data: countryResource[]) => {
            console.log('Success:', data);
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}