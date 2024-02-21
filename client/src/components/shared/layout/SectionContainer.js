import React from 'react'
import { useApp } from '../../../context/AppContext'
import './styles.scss'

function SectionContainer({children, title}) {
    const { settings } = useApp();
    const settingsData = settings?.data;
    const { theme } = settingsData;

    return (
        <section className={`section section-${theme}`}>
                <span className='section_label xs bold'>{title}</span>
            {children}
        </section>
    )
}

export default SectionContainer
