import React from 'react'
import { useApp } from '../../../context/AppContext'
import './styles.scss'

function SectionContainer({children, title, flex}) {
    const { theme } = useApp();

    return (
        <section style={flex && {height: '100%'}} className={`section section-${theme}`}>
                <span className='section_label xs bold'>{title}</span>
            {children}
        </section>
    )
}

export default SectionContainer
