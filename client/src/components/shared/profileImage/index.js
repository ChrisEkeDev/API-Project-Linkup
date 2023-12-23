import React from 'react';
import './styles.scss';

function ProfileImage({player, size }) {
    const borderHeight = size ? size : 5;
    const imageHeight = borderHeight - .5;
    const initialSize = borderHeight / 1.619;
    const hasImage = player?.profileImage !== null;

    return (
        <div
            className='image_border'
            style={{
                height: `${borderHeight}rem`,
                borderRadius: `${borderHeight}rem`
            }}
        >
            {
                !hasImage ?
                    <div className='profile_circle' style={{
                        height: `${imageHeight}rem`,
                        borderRadius: `${imageHeight}rem`
                    }}>
                        <p className='initial'style={{fontSize: `${initialSize}rem`}}>{player?.name.charAt(0)}</p>
                    </div>
                 :
                <div
                    className='image'
                    style={{
                        backgroundImage: `url(${player?.profileImage})`,
                        height: `${imageHeight}rem`,
                        borderRadius: `${imageHeight}rem`
                    }}
                />

            }
        </div>
    )
}

export default ProfileImage
