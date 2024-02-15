import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Link } from 'react-router-dom';
import Input from '../../../components/shared/inputs/textInput';
import Button from '../../../components/shared/button';
import IconButton from '../../../components/shared/button/IconButton';
import OAuth from '../components/OAuth'
import { TbLogin2, TbCode } from "react-icons/tb";
import { Redirect } from 'react-router-dom';
import '../styles.scss';
import useSignIn from '../hooks/useSignIn';
import LoadingData from '../../../components/shared/loading';
import { RiBasketballFill } from "react-icons/ri";

function SignIn() {
    const { auth, navigate } = useApp();
    const {
        errors,
        formData,
        handleInput,
        signInLoading,
        signInGuestLoading,
        onSignIn,
        onSignInGuest
    } = useSignIn();

    if (signInLoading || signInGuestLoading) return <LoadingData/>

    return (
        <main className='page auth'>
            {/* <IconButton
                styles="auth_icon"
                label="Back to Search"
                icon={RiBasketballFill}
                action={() => navigate('/search')}
            /> */}
            <form className='auth_form'>
                <header className='auth_form--header'>
                    <h1>Sign in</h1>
                    <Link to="/sign-up">Don't have an account?</Link>
                </header>
                <section className='auth_form--contents'>
                    <Input
                        label="Email"
                        placeholder='johndoe@email.com'
                        value={formData.email}
                        setValue={handleInput}
                        name='email'
                        error={errors.email}
                        disabled={false}
                    />
                    <Input
                        label="Password"
                        placeholder='your secret'
                        type='password'
                        value={formData.password}
                        setValue={handleInput}
                        name='password'
                        error={errors.password}
                        disabled={false}
                    />
                </section>
                <footer className='auth_form--actions'>
                    <Button
                        styles='auth_form_button primary'
                        type="button"
                        icon={TbLogin2}
                        label='Sign in'
                        disabled={Object.values(errors).length}
                        action={onSignIn}
                    />
                    <Button
                        styles='auth_form_button secondary'
                        type="button"
                        icon={TbCode}
                        label='Sign in as guest'
                        action={onSignInGuest}
                    />
                </footer>
            </form>
            <OAuth title='Sign in'/>
        </main>
            )
}

export default SignIn
