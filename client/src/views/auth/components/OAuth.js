import React from 'react'
import IconButton from '../../../components/shared/button/IconButton'
import { PiGoogleLogoBold, PiFacebookLogoBold, PiXLogoBold, PiTwitterLogoBold } from "react-icons/pi";
import useOAuth2 from '../hooks/useOAuth2'
import { TbBrandX, TbBrandGoogle , TbBrandFacebook  } from "react-icons/tb";


function OAuth() {
    const { googleAuth } = useOAuth2();

    return (
        <div className="auth_oauth">
            <span className="auth_divide xs bold">or</span>
            <p className="sm bold">Sign in using social account</p>
            <div className="oauth_container">
                <IconButton
                    label="Login with Google"
                    styles="lg_icon"
                    icon={TbBrandGoogle}
                    action={googleAuth}
                />
                <IconButton
                    label="Login with Facebook"
                    styles="lg_icon"
                    icon={TbBrandFacebook}
                    action={googleAuth}
                />
                <IconButton
                    label="Login with X"
                    styles="lg_icon"
                    icon={TbBrandX}
                    action={googleAuth}
                />
            </div>
        </div>
    )
}

export default OAuth
