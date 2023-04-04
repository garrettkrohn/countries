import { useMutation } from '@tanstack/react-query';
import React, {useState} from 'react';
import {createUser} from "../../services/userApi";

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

    return (
        <div>
            <div>
                Username:
            </div>
            <div>Background Color: </div>
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
        </div>
    );
};

export default UserPage;
