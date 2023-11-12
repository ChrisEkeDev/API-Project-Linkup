import React, { useEffect, useState} from 'react';
import { signUpAlerts } from '../../Shared/constants/alertData';
import { Redirect, Link } from 'react-router-dom';
import Modal from '../../Shared/components/Modal';
import { useApp } from '../../App/Context/AppContext';
import logo from '../../App/assets/backcourtlogo.svg';
import '../Styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import LocationServices from '../../Shared/components/Modal/LocationServices';
import { thunkSignUpPlayer } from '../../Store/auth';
import Inputs from '../../Shared/components/Inputs/Input';
import Button from '../../Shared/components/Button';
// import Image from '../Inputs/Image';

function SignUp() {
    const user = useSelector(state => state.auth.auth);
    const { signUpSuccess, signUpFailure } = signUpAlerts;
    const [ locationServicesPopUp, setLocationServicesPopUp ] = useState(false)
    const { theme, handleAlerts, setLoading, navigate, handleOpenModal, locationServices } = useApp();
    const [ signUpForm, setSignUpForm] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    })
    // const [ image, setImage] = useState(undefined);
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();

    const handleFormInput = (x) => {
      setSignUpForm((prev) => ({ ...prev, [x.target.id]: x.target.value }));
    }

    const submitPlayerSignUp = async (e) => {
      setLoading(true);
      e.preventDefault();
      try {
        // const response = await dispatch(thunkSignUpPlayer(signUpForm));
        handleAlerts(signUpSuccess);
        if (!locationServices) {
          setLocationServicesPopUp(true);
        }
        // navigate('/')
      } catch (error) {
        handleAlerts(signUpFailure);
        console.error(error)
      } finally {
        setLoading(false);
      }
    }

    // const submitForm = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     try {
    //       const userData = {
    //         name,
    //         email,
    //         password,
    //         // image: image ? image : null
    //       }
    //       const formData = new FormData();
    //       formData.append("firstName", userData.firstName)
    //       formData.append("lastName", userData.lastName)
    //       formData.append("email", userData.email)
    //       formData.append("username", userData.username)
    //       formData.append("password", userData.password)
    //       if (userData.image) formData.append("image", userData.image)
    //       const data = await dispatch(thunkSignUpPlayer(formData))
    //       handleAlerts({message: 'User created successfully'})
    //       history.push('/dashboard')
    //       close();
    //     } catch (error) {
    //       handleAlerts({message: "There was an error while creating your account."})
    //     } finally {
    //       setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //   const errors = {};
    //   if (name.trim().length === 0) {
    //     errors.name = 'Please enter a Name';
    //   }
    //   if (email.trim().length < 3 || email.trim().length > 256) {
    //     errors.email = 'Email must be between 3 and 256 characters';
    //   }
    //   if (!email.includes(".") || !email.includes("@")) {
    //     errors.email = 'Please enter a valid email address';
    //   }
    //   if (password.trim().length < 6) {
    //     errors.password = 'Password must be at least 6 characters';
    //   }
    //   if (password !== confirmPassword) {
    //     errors.confirmPassword = 'Passwords must match';
    //   }
    //   // const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png']
    //   // if (image && !validFileTypes.find(type => type === image.type)) {
    //   //     errors.image = "Please select a valid file type (png, jpg)"
    //   // }
    //   setErrors(errors)
    // }, [ name, email, password, confirmPassword ])

    if (user) return <Redirect to='/' />

  return (
    <main className={`auth--wrapper ${theme}-theme`}>
      {
        locationServicesPopUp &&
        <Modal>
          <LocationServices closeModal={() => setLocationServicesPopUp(false)}/>
        </Modal>
      }
      <div className='auth--contents'>
        <form className='auth__form--wrapper'>
          <div className='auth__form--contents'>
            <header className='auth__form--header'>
                {/* <img className='auth__form--logo' src={logo} /> */}
                <h1>Sign up</h1>
                <span>Already have an account? <Link to="/sign-in">Sign in</Link></span>
            </header>
            <div className='auth__form--inputs'>
              <Inputs
                label="Name"
                placeholder='Name'
                type='text'
                value={signUpForm.name}
                setValue={handleFormInput}
                name='name'
                error={errors.name}
                disabled={false}
              />
              <Inputs
                label="Email"
                  placeholder='Email'
                  type='text'
                  value={signUpForm.email}
                  setValue={handleFormInput}
                  name='email'
                  error={errors.email}
                  disabled={false}
              />
              <Inputs
                  label="Password"
                  placeholder='Password'
                  type='password'
                  value={signUpForm.password}
                  setValue={handleFormInput}
                  name='current-password'
                  error={errors.password}
                  disabled={false}
              />
              <Inputs
                  label="Confirm Password"
                  placeholder='Confirm Password'
                  type='password'
                  value={signUpForm.confirmPassword}
                  setValue={handleFormInput}
                  name='confirm-password'
                  error={errors.confirmPassword}
                  disabled={false}
              />
              {/* <Image
                  type='user'
                  name='image'
                  value={image}
                  setValue={setImage}
                  error={errors.image}
              /> */}
            </div>
            <div className='auth__form--actions'>
              <Button
                  style='auth__form--button'
                  type='primary'
                  label='Sign up'
                  disabled={Object.values(errors).length}
                  action={submitPlayerSignUp}
              />
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default SignUp
