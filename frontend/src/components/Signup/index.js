import React, { useEffect, useState} from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useLoading } from '../../context/LoadingProvider';
import { useDispatch, useSelector } from 'react-redux';
import { thunkSignUp } from '../../store/session';
import useInitialRender from '../../hooks/useInitialRender';
import Inputs from '../Inputs/Inputs';
import Button from '../Buttons/Button';

function Signin({close}) {
    const user = useSelector(state => state.session.user);
    const { setLoading } = useLoading();
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
        setLoading(true);
        return (
            dispatch(thunkSignUp(data))
            .then(() => {
              close();
              setLoading(false)
            })
            .catch(async(errors) => {
              const data = await errors.json();
              if (data && data.errors) setErrors(data.errors)
              setLoading(false)
            })
        )
    }

    useInitialRender(() => {
      const errors = {};
      if (firstName.trim().length === 0) {
        errors.firstName = 'Please enter a First Name';
      }
      if (lastName.trim().length === 0) {
        errors.lastName = 'Please enter a Last Name';
      }
      if (email.trim().length < 3 || email.trim().length > 256) {
        errors.email = 'Email must be between 3 and 256 characters';
      }
      if (!email.includes(".") || !email.includes("@")) {
        errors.email = 'Please enter a valid email address';
      }
      if (username.trim().length < 4 || username.trim().length > 30 ) {
        errors.username = 'Username must be between 4 and 30 characters';
      }
      if (username.includes(".") && username.includes("@")) {
        errors.username = 'Username cannot be an email address';
      }
      if (password.trim().length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      setErrors(errors)
    }, [firstName, lastName, email, password, username])

    if (user) return <Redirect to='/' />

  return (
    <form className='form-contents' onSubmit={submitForm}>
            <div className='form-close'><FaTimes onClick={close}/></div>
            <h2 className='subheading'>Sign up</h2>
            <Inputs
                placeholder='First Name'
                type='text'
                value={firstName}
                setValue={(x) => setFirstName(x.target.value)}
                name='firstName'
                error={errors.firstName}
                disabled={false}
            />
            <Inputs
                placeholder='Last Name'
                type='text'
                value={lastName}
                setValue={(x) => setLastName(x.target.value)}
                name='lastName'
                error={errors.lastName}
                disabled={false}
            />
            <Inputs
                placeholder='Username'
                type='text'
                value={username}
                setValue={(x) => setUsername(x.target.value)}
                name='username'
                error={errors.username}
                disabled={false}
            />
            <Inputs
                placeholder='Email'
                type='text'
                value={email}
                setValue={(x) => setEmail(x.target.value)}
                name='email'
                error={errors.email}
                disabled={false}
            />
            <Inputs
                placeholder='Password'
                type='password'
                value={password}
                setValue={(x) => setPassword(x.target.value)}
                name='current-password'
                error={errors.password}
                disabled={false}
            />
            <Button
                type='primary'
                label='Sign up'
                disabled={Object.values(errors).length}
            />
        </form>
  )
}

export default Signin
