import React, { useEffect, useState} from 'react';
import { signUpAlerts } from '../../Shared/constants/alertData';
import { Redirect, Link } from 'react-router-dom';
import Modal from '../../App/Modals';
import { useApp } from '../../App/Context/AppContext';
import logo from '../../App/assets/backcourtlogo.svg';
import '../Styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import LocationServices from '../../Shared/components/Modal/LocationServices';
import { thunkSignUpPlayer } from '../../Store/auth';
import Input from '../../Shared/components/Inputs/Input';
import Button from '../../Shared/components/Button';
import useFormValidation from '../../Shared/hooks/useFormValidation';
// import Image from '../Inputs/Image';

function SignUp() {
    const user = useSelector(state => state.auth.player);
    const { signUpSuccess, signUpFailure } = signUpAlerts;
    const [ locationServicesPopUp, setLocationServicesPopUp ] = useState(false)
    const { theme, handleAlerts, setLoading, navigate, locationServices } = useApp();
    const [ formData, errors, handleErrors, handleFormInput ] = useFormValidation();
    const dispatch = useDispatch();


    const submitPlayerSignUp = async (e) => {
      setLoading(true);
      e.preventDefault();
      try {
        const response = await dispatch(thunkSignUpPlayer(formData));
        if (response.status === 201) {
          handleAlerts(signUpSuccess);
          navigate('/')
        } else {
          handleErrors(response.errors)
          throw new Error();
        }
      } catch (error) {
        handleAlerts(signUpFailure);
        console.error(error)
      } finally {
        setLoading(false);
      }
    }

    if (user) return <Redirect to='/' />

  return (
    <main className={`auth--wrapper ${theme}-theme`}>
      <div className='auth--contents'>
        <form className='auth__form--wrapper'>
          <div className='auth__form--contents'>
            <header className='auth__form--header'>
                {/* <img className='auth__form--logo' src={logo} /> */}
                <h1>Sign up</h1>
                <span>Already have an account? <Link to="/sign-in">Sign in</Link></span>
            </header>
            <div className='auth__form--inputs'>
              <Input
                label="Name"
                placeholder='Name'
                type='text'
                value={formData?.name}
                setValue={handleFormInput}
                name='name'
                error={errors?.name}
                disabled={false}
              />
              <Input
                label="Email"
                  placeholder='Email'
                  type='text'
                  value={formData?.email}
                  setValue={handleFormInput}
                  name='email'
                  error={errors?.email}
                  disabled={false}
              />
              <Input
                  label="Password"
                  placeholder='Password'
                  type='password'
                  value={formData?.password}
                  setValue={handleFormInput}
                  name='password'
                  error={errors?.password}
                  disabled={false}
              />
              <Input
                  label="Confirm Password"
                  placeholder='Confirm Password'
                  type='password'
                  value={formData?.confirmPassword}
                  setValue={handleFormInput}
                  name='confirmPassword'
                  error={errors?.confirmPassword}
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
                  //disabled={Object.values(errors).length}
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
