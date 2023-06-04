import React, { useEffect, useState} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useLoading } from '../../context/LoadingProvider';
import { useAlerts } from '../../context/AlertsProvider';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLogIn } from '../../store/session';
import Inputs from '../Inputs/Inputs';
import Button from '../Buttons/Button';
import useInitialRender from '../../hooks/useInitialRender';

function Login({close}) {
    const user = useSelector(state => state.session.user);
    const { setLoading } = useLoading();
    const { handleAlerts } = useAlerts();
    const [ credential, setCredential ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const submitLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {credential, password};
        return (
            dispatch(thunkLogIn(data))
            .then(() => {
                close()
                setLoading(false)
                history.push('/dashboard')
            })
            .catch(async(errors) => {
                const data = await errors.json();
                if (data && data.errors) setErrors(data.errors)
                handleAlerts(data)
                setLoading(false)
            })
        )
    }

    const submitDemoLogin = async (e) => {
        e.preventDefault();
        const data = {credential: 'cartyp', password: 'password1'};
        setLoading(true);
        return (
            dispatch(thunkLogIn(data))
            .then(() => {
                close();
                setLoading(false)
                history.push('/dashboard')
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
        if (credential.trim().length < 4) {
          errors.credential = 'Username or Email must be at least 4 characters';
        }
        if (password.trim().length < 4) {
          errors.password = 'Password must be at least 4 characters';
        }
        setErrors(errors)
    }, [credential, password])

    if (user) return <Redirect to='/dashboard' />

    return (
        <form className='modal-contents' onSubmit={submitLogin}>
            <div className='modal-close'><FaTimes onClick={close}/></div>
            <h2 className='subheading'>Log in</h2>
            <Inputs
                placeholder='Username or Email'
                value={credential}
                setValue={(x) => setCredential(x.target.value)}
                name='credential'
                error={errors.credential}
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
                style='spaced'
                type='primary'
                label='Sign in'
                disabled={Object.values(errors).length}
            />
            <Button
                style='spaced'
                type='secondary'
                label='Demo user'
                action={(e) => submitDemoLogin(e)}
            />
        </form>
    )
}

export default Login
