import React from 'react'
import { useSelector } from 'react-redux'
import { TbMenu, TbX } from 'react-icons/tb'

function ProfilePicture({menu}) {
    const player = useSelector(state => state.auth.player);

    return (
        <div className='profile_picture_wrapper'>
            <div className='profile_picture_contents'
            style={ player?.profileImage ? {backgroundImage: `url(${player?.profileImage})`} : null}>
                {
                    player ?
                    null :
                    <>
                    {
                        menu ?
                        <TbX className='profile_picture_logo'/> :
                        <TbMenu className='profile_picture_logo'/>
                    }
                    </>
                }
            </div>
        </div>
    )
}

export default ProfilePicture
