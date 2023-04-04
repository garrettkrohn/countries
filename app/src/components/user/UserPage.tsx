import { useMutation, useQuery } from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {createUser, getUsers} from "../../services/userApi";
import {getCountries} from "../../services/countriesApi";
import Loading from "../../utilities/Loading";
import Error from "../../utilities/Error";

const UserPage = () => {
    const [localColor, setLocalColor] = useState('000000');
    const [username, setUsername] = useState('');

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
                {usersData.map((user, index) => (
                    <div key={index}>
                        <div>username: {user.username}</div>
                        <div>color: {user.backgroundColor}</div>
                    </div>
                ))}
            </div>
        );
    }

};

export default UserPage;
