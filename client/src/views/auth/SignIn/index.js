import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/shared/inputs/textInput';
import Button from '../../../components/shared/button';
import '../styles.scss';
import useSignIn from '../hooks/useSignIn';

function SignIn() {
    const {
        errors,
        formData,
        handleInput,
        onSignIn,
        onSignInGuest
    } = useSignIn();

    return (
        <main className='page auth'>
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
                        styles='auth_form--button primary'
                        type="button"
                        label='Sign in'
                        disabled={Object.values(errors).length}
                        action={onSignIn}
                    />
                    <Button
                        styles='auth_form--button secondary'
                        type="button"
                        label='Sign in as guest'
                        action={onSignInGuest}
                    />
                </footer>
            </form>
        </main>
            )
}

export default SignIn
