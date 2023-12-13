import React from 'react';
import './styles.scss';

function ProfileImage({player, size }) {
    const borderHeight = size ? size : 5;
    const imageHeight = borderHeight - .5;
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
                <p className='initial'>{player?.name.charAt(0)}</p> :
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
