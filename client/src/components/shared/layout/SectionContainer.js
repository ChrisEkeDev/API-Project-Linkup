import React from 'react'
import { useApp } from '../../../context/AppContext'
import './styles.scss'

function SectionContainer({children, title}) {
    const { theme } = useApp();

    return (
        <section className={`section section-${theme}`}>
                <span className='section_label xs bold'>{title}</span>
            {children}
        </section>
    )
}

export default SectionContainer
