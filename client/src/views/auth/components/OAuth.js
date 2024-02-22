import React from 'react'
import Button from '../../../components/shared/button';
import useOAuth2 from '../hooks/useOAuth2'
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";

function OAuth({title}) {
    const { googleAuth, appleAuth } = useOAuth2();

    return (
        <div className="auth_oauth">
            <span className="auth_divide xs bold">or</span>
            <Button
                label={`${title} using your Google account`}
                icon={FcGoogle}
                action={googleAuth}
                styles="auth_form_button tertiary"
            />
            {/* <Button
                label={`${title} using your Apple account`}
                icon={IoLogoApple}
                action={appleAuth}
                styles="auth_form_button secondary"
            /> */}
        </div>
    )
}

export default OAuth
