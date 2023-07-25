import React, { useEffect, useState} from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useLoading } from '../../context/LoadingProvider';
import { useDispatch, useSelector } from 'react-redux';
import { useAlerts } from '../../context/AlertsProvider'
import { thunkSignUp } from '../../store/session';
import useInitialRender from '../../hooks/useInitialRender';
import Inputs from '../Inputs/Inputs';
import Button from '../Buttons/Button';
import Image from '../Inputs/Image';

function Signup({close}) {
    const user = useSelector(state => state.session.user);
    const { setLoading } = useLoading();
    const { handleAlerts } = useAlerts();
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ image, setImage] = useState(undefined);
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const userData = {
            firstName,
            lastName,
            email,
            username,
            password,
            image: image ? image : null
          }
          const formData = new FormData();
          formData.append("firstName", userData.firstName)
          formData.append("lastName", userData.lastName)
          formData.append("email", userData.email)
          formData.append("username", userData.username)
          formData.append("password", userData.password)
          if (userData.image) formData.append("image", userData.image)
          const data = await dispatch(thunkSignUp(formData))
          handleAlerts({message: 'User created successfully'})
          history.push('/dashboard')
          close();
        } catch (error) {
          console.log(error)
          handleAlerts({message: "There was an error while creating your account."})
        } finally {
          setLoading(false)
        }
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
      if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
      }
      const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png']
      if (image && !validFileTypes.find(type => type === image.type)) {
          errors.image = "Please select a valid file type (png, jpg)"
      }
      setErrors(errors)
    }, [firstName, lastName, email, password, confirmPassword, username, image])

    if (user) return <Redirect to='/' />

  return (
    <form className='modal-contents' onSubmit={submitForm}>
            <div className='modal-close'><FaTimes onClick={close}/></div>
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
            <Inputs
                placeholder='Confirm Password'
                type='password'
                value={confirmPassword}
                setValue={(x) => setConfirmPassword(x.target.value)}
                name='confirm-password'
                error={errors.confirmPassword}
                disabled={false}
            />
            <Image
                type='user'
                name='image'
                value={image}
                setValue={setImage}
                error={errors.image}
            />
            <Button
                style='spaced small-btn'
                type='primary'
                label='Sign up'
                disabled={Object.values(errors).length}
            />
        </form>
  )
}

export default Signup
