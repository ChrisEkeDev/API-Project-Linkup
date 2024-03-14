import React from 'react'
import Scroll from '../scroll'

function PageBody({children}) {
  return (
    <div className="page_body">
        <Scroll>
            {children}
        </Scroll>
    </div>
  )
}

export default PageBody
