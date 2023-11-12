import React from 'react';
import { useApp } from '../App/Context/AppContext';
import { TbMoon, TbSun } from 'react-icons/tb';

function ThemeHandler() {
    const { theme, handleTheme } = useApp();
    return (
        <div className='navigation_setting_wrapper'>
            <div onClick={handleTheme} className='navigation_setting_contents'>
                <span className='navigation_setting_label' >
                    {theme} mode
                </span>
                {
                    theme === "dark" ?
                    <TbMoon className='navigation_setting_icon'/> :
                    <TbSun className='navigation_setting_icon'/>
                }
            </div>
        </div>
    )
}

export default ThemeHandler
