import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../Shared/components/Button'
import { TbPlus } from 'react-icons/tb';
import { useApp } from '../App/Context/AppContext';

const SessionsSort = ({handleSort}) => {
    return (
        <div className='sessions__results_sort'>
            <span className='sessions__results_sort--label'>Sort</span>
            <select className='sessions__results_sort--select'>
                <option>Number of Players</option>
            </select>
        </div>
    )
}

const SessionsFilter = () => {
    return (
        <div className='sessions__results_sort'>
            <span className='sessions__results_sort--label'>Filter</span>
            <select className='sessions__results_sort--select'>
                <option>Number of Players</option>
            </select>
        </div>
    )
}

function SessionsOptions({handleSort}) {
    const { navigate } = useApp();
    const player = useSelector(state => state.auth.player);

    return (
        <header className='sessions__results_header--wrapper'>
            <section className='sessions__results_header--contents'>
                <span  className='sessions__results_header--title' >Results</span>
                <div className='sessions__results_header--options'>
                    <SessionsFilter/>
                    <SessionsSort handleSort={handleSort}/>
                    <Button
                        style='sessions__results_header--button'
                        type="primary"
                        label={player ? "New" : "Sign in to create a session"}
                        icon={TbPlus}
                        action={player ? () => navigate('/new-session') : () => navigate('/sign-in')}
                    />
                </div>
            </section>
        </header>
    )
}

export default SessionsOptions
