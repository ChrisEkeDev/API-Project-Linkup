import React from 'react';
import { Link } from 'react-router-dom';
import LoadingData from '../../../components/shared/loading'
import '../styles.scss';
import Input from '../../../components/shared/inputs/textInput';
import Button from '../../../components/shared/button';
import { TbUserPlus, TbCode } from "react-icons/tb";
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import OAuth from '../components/OAuth'

function SignUp() {
  const {
    errors,
    signUpLoading,
    formData,
    handleInput,
    onSignUp,
  } = useSignUp();

  const {
    onSignInGuest
  } = useSignIn();

  if (signUpLoading) return <LoadingData/>

  return (
    <main className='page auth'>
      <form className='auth_form'>
        <header className='auth_form--header'>
          <h1>Sign Up</h1>
          <Link to="/sign-in">Already have an account?</Link>
        </header>
        <section className='auth_form--contents'>
          <Input
            label="Name"
            placeholder='Joe Smith'
            type='text'
            value={formData.name}
            setValue={handleInput}
            name='name'
            error={errors.name}
            disabled={false}
          />
          <Input
            label="Email"
            placeholder='joesmith@email.com'
            type='email'
            value={formData.email}
            setValue={handleInput}
            name='email'
            error={errors.email}
            disabled={false}
          />
          <Input
            label="Password"
            placeholder='yoursecrect'
            type='password'
            value={formData.password}
            setValue={handleInput}
            name='password'
            error={errors.password}
            disabled={false}
          />
          <Input
            label="Confirm Password"
            placeholder='yoursecrect'
            type='password'
            value={formData.confirmPassword}
            setValue={handleInput}
            name='confirmPassword'
            error={errors.confirmPassword}
            disabled={false}
          />
        </section>
        <footer className='auth_form--actions'>
          <Button
            styles='auth_form_button primary'
            type='button'
            icon={TbUserPlus}
            label='Sign up'
            disabled={Object.values(errors).length || signUpLoading}
            action={onSignUp}
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
      <OAuth title='Sign up'/>
    </main>
  )
}

export default SignUp
