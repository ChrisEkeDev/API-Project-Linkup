import React from 'react';

function NavigationMenuLink(props) {
    const { label, action, icon } = props;

    return (
        <div onClick={action} className='navigation_menu_link_wrapper'>
            <div className='navigation_menu_link_contents'>
                <span className='navigation_menu_link_label'>{label}</span>
                <span className='navigation_menu_link_icon'>{icon}</span>
            </div>
        </div>
    )
}

export default NavigationMenuLink
