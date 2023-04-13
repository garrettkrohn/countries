import { useMutation, useQuery } from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {createUser, getUsers} from "../../services/userApi";
import {getCountries} from "../../services/countriesApi";
import Loading from "../../utilities/Loading";
import Error from "../../utilities/Error";
import {selectedCountry, selectedUser} from "../../services/Atoms";
import { useAtom } from 'jotai';
import { SliderPicker } from 'react-color';

const UserPage = () => {
    const [localColor, setLocalColor] = useState('FF0000');
    const [username, setUsername] = useState('');
    const [user, setUser] = useAtom(selectedUser);

    const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleBackgroundChangeComplete = (event: any) => {
        setLocalColor(event.hex);
    };

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
                <SliderPicker
                    color={localColor}
                    onChangeComplete={handleBackgroundChangeComplete}
                />
                <div className='w-25 h-25' style={{backgroundColor: localColor}}>Preview</div>
                <button className='bg-red-500' onClick={() => mutate()}>Submit new user</button>
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
