import React, { useEffect, useState} from 'react';
import { signInAlerts } from '../../Shared/constants/alertData';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Shared/components/Inputs/Input';
import Button from '../../Shared/components/Button';
import { thunkSignInPlayer } from '../../Store/auth';
import { useApp } from '../../App/Context/AppContext';
import logo from '../../App/assets/backcourtlogo.svg';
import '../Styles.scss';
import useFormValidation from '../../Shared/hooks/useFormValidation';

function SignIn() {
    const { handleAlerts, setLoading, navigate, theme } = useApp();
    const { signInSuccess, signInFailure } = signInAlerts;
    const currentPlayer = useSelector(state => state.auth.player);
    const [ formData, errors, handleErrors, handleFormInput ] = useFormValidation();
    const dispatch = useDispatch();

    const submitPlayerSignIn = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await dispatch(thunkSignInPlayer(formData));
            if (response.status === 200) {
                handleAlerts(signInSuccess);
                navigate('/')
            } else {
                handleErrors(response.errors)
                throw new Error();
            }
        } catch (error) {
            handleAlerts(signInFailure);
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const submitGuestSignIn = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const playerData = {email: 'pcartwirght@email.com', password: 'password1'};
            const response = await dispatch(thunkSignInPlayer(playerData));
            if (response.status === 200) {
                handleAlerts(signInSuccess);
                navigate('/')
            } else {
                throw new Error();
            }
        } catch (error) {
            handleAlerts(signInFailure);
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (currentPlayer) return <Redirect to='/' />

    return (
        <main className={`auth--wrapper ${theme}-theme`}>
            <div className='auth--contents'>
                <form className='auth__form--wrapper'>
                    <div className='auth__form--contents'>
                        <header className='auth__form--header'>
                            {/* <img className='auth__form--logo' src={logo} /> */}
                            <h1>Sign in</h1>
                            <span>Don't have an account? <Link to="/sign-up">Sign up</Link></span>
                        </header>
                        <div className='auth__form--inputs'>
                            <Input
                                label="Email"
                                placeholder='johndoe@email.com'
                                value={formData?.email}
                                setValue={handleFormInput}
                                name='email'
                                error={errors?.email}
                                disabled={false}
                            />
                            <Input
                                label="Password"
                                placeholder='your secret'
                                type='password'
                                value={formData?.password}
                                setValue={handleFormInput}
                                name='password'
                                error={errors?.password}
                                disabled={false}
                            />
                        </div>
                        <div className='auth__form--actions'>
                            <Button
                                style='auth__form--button'
                                type='primary'
                                label='Sign in'
                                //disabled={errors && Object.values(errors).length}
                                action={submitPlayerSignIn}
                            />
                            <Button
                                style='auth__form--button'
                                type='secondary'
                                label='Sign in as guest'
                                action={submitGuestSignIn}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </main>

    )
}

export default SignIn
