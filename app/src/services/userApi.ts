export interface createUser {
    username: string,
    backgroundColor: string,
}

export interface userResource {
    userId: number,
    username: string,
    backgroundColor: string,
}

export async function createUser(createUser: createUser): Promise<userResource> {
    const url ='http://localhost:8000/api/users';
    console.log(createUser);
    return await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(createUser)
    })
        .then(response => response.json())
        .then((data: userResource) => {
            console.log('Success:', data);
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}