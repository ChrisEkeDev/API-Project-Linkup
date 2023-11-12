import React, { forwardRef } from 'react'

function HoverMenu({children}) {
  return (
    <div className='hover_menu_wrapper'>
        <div className='hover_menu_contents'>
            {children}
        </div>
    </div>
  )
}

export default HoverMenu
