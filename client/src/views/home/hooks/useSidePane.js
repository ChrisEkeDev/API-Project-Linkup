import React, { useState } from 'react'

const useSidePane = () => {
    const[ sidePaneOpen, setSidePaneOpen ] = useState(true)

    const onToggleSidePane = () => {
        setSidePaneOpen(!sidePaneOpen)
    }

    return {sidePaneOpen, onToggleSidePane}
}

export default useSidePane
