export interface countryResource {
    area: number,
    capital: string,
    countryId: number,
    flag: string,
    name: string,
    population: number,
    region: string
}

export async function getCountries(): Promise<countryResource[]> {
    const url ='http://localhost:8000/api/countries';
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