import { useMutation, useQuery } from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {createUser, getUsers} from "../../services/userApi";
import {getCountries} from "../../services/countriesApi";
import Loading from "../../utilities/Loading";
import Error from "../../utilities/Error";
import {selectedCountry, selectedUser} from "../../services/Atoms";
import { useAtom } from 'jotai';

const UserPage = () => {
    const [localColor, setLocalColor] = useState('FF0000');
    const [username, setUsername] = useState('');
    const [user, setUser] = useAtom(selectedUser);

    const changeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalColor(event.target.value);
    }

    const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const {data, mutate} = useMutation({
        mutationFn: () =>
            createUser({username: username, backgroundColor: localColor}),
        onMutate: () => console.log('mutate'),
        onError: (err, variables, context) => {
            console.log(err, variables, context);
        },
        onSettled: () => console.log('complete'),
    });

    const {
        isLoading: usersAreLoading,
        error: usersError,
        data: usersData,
        refetch: usersRefetch
    } = useQuery({
        queryKey: [`users`],
        queryFn: () => getUsers(),
    });

    useEffect(() => {
        return () => {
            usersRefetch()
        };
    }, [data]);


    if (usersAreLoading)
        return (
            <div>
                <Loading />
            </div>
        );

    if (usersError) return <Error />;

    if (usersData) {
        return (
            <div>
                <div>
                    <label>New Username: </label>
                    <input type='text' value={username} onChange={changeUsername}
                    ></input>
                </div>
                <div>
                    <label>New Hex Color (only 6 characters): </label>
                    <input type="text" value={localColor} onChange={changeColor}></input>
                </div>
                <button onClick={() => mutate()}>Submit new user</button>
                <div>Selected User: {user.username}</div>
                {usersData.map((user, index) => (
                    <div key={index} className='border'>
                        <div>username: {user.username}</div>
                        <div>color: {user.backgroundColor}</div>
                        <button className='bg-red-700' onClick={() => setUser(user)}>Select User</button>
                    </div>
                ))}
            </div>
        );
    }

};

export default UserPage;
