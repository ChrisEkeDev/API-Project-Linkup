import React, { useEffect, useState } from 'react';
import Inputs from '../Inputs/Inputs';
import TextArea from '../Inputs/TextArea';
import Button from '../Buttons/Button';
import Select from '../Inputs/Select';
import { states } from '../../utils/states';
import './CreateGroup.css';

function CreateGroup() {
  return (
    <main className='create_group-wrapper'>
        <div className='create_group-contents'>
            <header className='create_group-header'>
                <h3 className='body green'>BECOME AN ORGANIZER</h3>
                <h2 className='subheading'>We'll walk you through a few steps to build your local community</h2>
            </header>
            <form className='create_group-form'>
                <fieldset className='create_group-fieldset'>
                    <h2 className='subheading'>First, set your group's location.</h2>
                    <p className='body subheader'>Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.</p>
                    <Inputs
                        placeholder='City'
                    />
                    <Select
                        placeholder='State'
                        values={states}
                    />
                </fieldset>
                <fieldset className='create_group-fieldset'>
                    <h2 className='subheading'>What will your group's name be?</h2>
                    <p className='body subheader'>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</p>
                    <Inputs
                        placeholder='What is your group name?'
                    />
                </fieldset>
                <fieldset className='create_group-fieldset'>
                    <h2 className='subheading'>Now describe what your group will be about</h2>
                    <p className='body subheader'>People will see this when we promote your group, but you'll be able to add to it later, too.</p>
                    <ol className='create_group-list'>
                        <li className='body'>What's the purpose of the group?</li>
                        <li className='body'>Who should join?</li>
                        <li className='body'>What will you do at your events?</li>
                    </ol>
                    <TextArea
                        placeholder='Please write at least 30 characters'
                    />
                </fieldset>
                <fieldset className='create_group-fieldset'>
                    <h2 className='subheading'>Final steps...</h2>
                    <Select
                        label='Is this an in person or online group?'
                        placeholder='select one'
                        values={['In person', 'Online']}
                    />
                    <Select
                        label='Is this group private or public?'
                        placeholder='select one'
                        values={['Private', 'Public']}
                    />
                    {/* <Inputs
                        label='Is this an in person or online group?'
                        placeholder='(select one)'
                    />
                    <Inputs
                        label='Is this group private or public?'
                        placeholder='(select one)'
                    /> */}
                    <Inputs
                        label='Please add in image url for your group below:'
                        placeholder='url'
                    />
                </fieldset>
                <Button
                    style='create_group-btn'
                    label='Create group'
                    type='primary'
                />
            </form>
        </div>
    </main>
  )
}

export default CreateGroup
