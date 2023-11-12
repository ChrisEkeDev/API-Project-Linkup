import React, { useEffect, useState} from 'react';
import { signInAlerts } from '../../Shared/constants/alertData';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Inputs from '../../Shared/components/Inputs/Input';
import Button from '../../Shared/components/Button';
import { thunkSignInPlayer } from '../../Store/auth';
import { useApp } from '../../App/Context/AppContext';
import logo from '../../App/assets/backcourtlogo.svg';
import '../Styles.scss';

function SignIn() {
    const { handleAlerts, setLoading, navigate, theme } = useApp();
    const { signInSuccess, signInFailure } = signInAlerts;
    const currentPlayer = useSelector(state => state.auth.auth);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();

    const submitPlayerSignIn = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const playerData = {email, password};
            const response = await dispatch(thunkSignInPlayer(playerData));
            handleAlerts(signInSuccess);
            console.log(response);
            navigate('/')
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
            handleAlerts(signInSuccess);
            console.log(response);
            navigate('/')
        } catch (error) {
            handleAlerts(signInFailure);
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const errors = {};
        if (email.trim().length < 3 || email.trim().length > 256) {
            errors.email = 'Email must be between 3 and 256 characters';
          }
        if (!email.includes(".") || !email.includes("@")) {
        errors.email = 'Please enter a valid email address';
        }
        if (password.trim().length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        setErrors(errors)
    }, [email, password])

    if (currentPlayer) return <Redirect to='/' />

    return (
        <main className={`auth--wrapper ${theme}-theme`}>
            <div className='auth--contents'>
                <form className='auth__form--wrapper'>
                    <div className='auth__form--contents'>
                        <header className='auth__form--header'>
                            <img className='auth__form--logo' src={logo} />
                            <h1>Sign in</h1>
                            <span>Don't have an account? <Link to="/sign-up">Sign up</Link></span>
                        </header>
                        <div className='auth__form--inputs'>
                            <Inputs
                                label="Email"
                                placeholder='johndoe@email.com'
                                value={email}
                                setValue={(x) => setEmail(x.target.value)}
                                name='email'
                                error={errors.email}
                                disabled={false}
                            />
                            <Inputs
                                label="Password"
                                placeholder='your secret'
                                type='password'
                                value={password}
                                setValue={(x) => setPassword(x.target.value)}
                                name='current-password'
                                error={errors.password}
                                disabled={false}
                            />
                        </div>
                        <div className='auth__form--actions'>
                            <Button
                                style='auth__form--button'
                                type='primary'
                                label='Sign in'
                                disabled={Object.values(errors).length}
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
