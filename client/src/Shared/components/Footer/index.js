import React from 'react'
import { TbBrandDribbble, TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb';
import './styles.scss'

function Footer() {
  return (
    <footer className="landing--footer">
                <div className='landing--socials'>
                    <a target='_blank'  rel="noreferrer" href='https://linkedin.com/in/iamchriseke'>
                        <TbBrandLinkedin/>
                    </a>
                    <a target='_blank'  rel="noreferrer" href='https://dribbble.com/chriseke'>
                        <TbBrandDribbble/>
                    </a>
                    <a target='_blank' rel="noreferrer" href='https://github.com/ChrisEkeDev'>
                        <TbBrandGithub/>
                    </a>
                </div>
                <div className='landing--technologies'>
                    <span className='landing--technology-item'>
                        <span>React</span>
                    </span>
                    <span className='landing--technology-item'>
                        <span>Node.js</span>
                    </span>
                    <span className='landing--technology-item'>
                        <span>Javascript</span>
                    </span>
                    <span className='landing--technology-item'>
                        <span>CSS3</span>
                    </span>
                    <span className='landing--technology-item'>
                        <span>Express</span>
                    </span>
                    <span className='landing--technology-item'>
                        <span>Redux</span>
                    </span>
                    <span className='landing--technology-item'>
                        <span>PostgreSQL</span>
                    </span>
                    <span className='landing--technology-item'>
                        <span>Render</span>
                    </span>
                </div>
                <a href="https://github.com/ChrisEkeDev/API-Project-Linkup" rel="noreferrer" target="_blank" className='landing--repo'>
                    <TbBrandGithub className='repo--icon'/>
                    <span>Github Repo</span>
                </a>
    </footer>
  )
}

export default Footer
