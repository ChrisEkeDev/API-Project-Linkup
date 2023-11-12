import React from 'react'
import { useState } from 'react';
import './Inputs.css';
import '../Buttons/Button.css';
import { TbExclamationCircle } from 'react-icons/tb';

function Image({name, label, error, value, setValue, type}) {
    const [imagePreview, setImagePreview ] = useState(undefined)

    const handleImage = (e) => {
        setValue(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    };

    return (
        <label htmlFor={name}  className='upload_input--wrapper'>
            {imagePreview ? <div className={`${type === 'user' ? 'user_image--preview' : 'display_image--preview'}`} style={{backgroundImage: `url(${imagePreview})`}}></div> : null }
            <div className='button_input--wrapper'>
                <div className='upload-btn'>{imagePreview ? 'Change Image' : 'Upload Image'}</div>
                { value ? <span className='value--populated'>{value.name}</span> : <span className='value--not_populated'>No file chosen</span>}
                <input id={name} className='media--input' type='file' accept='image/*' onChange={(x) => handleImage(x)}/>
            </div>
            <span className='input--label'>{label}</span>
            {
                error &&
                <div className='input_error--wrapper'>
                    <TbExclamationCircle className='input_error--icon'/>
                    <small className='input_error--label'>{error}</small>
                </div>
            }
            </label>
    )
}

export default Image
