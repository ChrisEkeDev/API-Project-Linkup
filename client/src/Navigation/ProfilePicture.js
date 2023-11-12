import React from 'react'
import { useSelector } from 'react-redux'
import { TbMenu, TbX } from 'react-icons/tb';
import logo from '../App/assets/bclogo.svg';

function ProfilePicture({menu}) {
    const player = useSelector(state => state.auth.auth)
    const noPlayerOrImage = !player || player?.profileImage !== null;

    return (
        <div className='profile_picture_wrapper'>
            <div className='profile_picture_contents'
            style={ !noPlayerOrImage ? {backgroundImage: `url(${player?.profileImage})`} : null}>
                {
                    noPlayerOrImage ?
                    // <img className='profile_picture_logo' src={logo}/>
                        menu ?
                        <TbX className='profile_picture_logo'/> :
                        <TbMenu className='profile_picture_logo'/>
                    : null
                }
            </div>
        </div>
    )
}

export default ProfilePicture
