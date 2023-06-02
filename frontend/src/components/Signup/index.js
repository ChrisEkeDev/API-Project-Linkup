import React, { useEffect, useState} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLogIn } from '../../store/session';
import Inputs from '../Inputs/Inputs';
import Button from '../Buttons/Button';

function Signin() {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();

    const submitForm = (e) => {
        e.preventDefault();
        const data = {firstName, lastName, email, username, password};
        return (
            dispatch(thunkLogIn(data))
            .catch( async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
        )
    }

  return (
    <div>

    </div>
  )
}

export default Signin
