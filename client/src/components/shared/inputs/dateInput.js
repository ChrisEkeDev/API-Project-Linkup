import React from 'react'

function DateInput(props) {
    const {
        label,
        name,
        value,
        setValue,
        error,
        disabled
    } = props;
    const { errorBorder } = globalStyles || '1px solid #a02828';
    return (
        <label>
            <input
                id={name}
                name={name}
                defaultValue={value}
                onChange={setValue}
                type='date'
                style={error ? {outline: errorBorder} : null}
                disabled={disabled}
            />
        </label>
    )
}

export default DateInput
