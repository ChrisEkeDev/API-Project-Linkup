import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataLoading from '../Loading/DataLoading';
import GroupItem from '../Groups/GroupItem';
import EventItem from '../Events/EventItem';
import '../Search/Search.css';

function SearchResults() {
    const [tab, setTab] = useState('events');
    const [isLoading, setIsLoading] = useState(true);
    const results = useSelector(state => state.search.results);
    const normalizedResults = Object.values(results)
    const groups = normalizedResults.filter(item => item.hasOwnProperty('organizerId'))
    const events = normalizedResults.filter(item => item.hasOwnProperty('groupId'))


    useEffect(() => {
        setIsLoading(false)
    }, [])

    if (isLoading) return <DataLoading></DataLoading>

  return (
    <main id='search-wrapper'>
        <div className='search-contents'>
            <header className='search-header'>
                <div className='search-tabs'>
                    <p onClick={() => setTab('events')} className={`search-tab ${tab === 'events' ? 'active-tab' : ''}`}>Events</p>
                    <p onClick={() => setTab('groups')} className={`search-tab ${tab === 'groups' ? 'active-tab' : ''}`}>Groups</p>
                </div>
                <p className='body small'>Search Results for {tab === 'events' ? 'Events' : 'Groups'}</p>
            </header>
            <section>
                {
                tab === 'events' ?
                events.length > 0 ?
                <ul>
                    {
                        events.map(event => {
                            return (
                                <EventItem key={event.id} id={event.id}/>
                            )
                        })
                    }
                </ul>
                :
                <div>NO results</div>:
                groups.length > 0 ?
                <ul>
                    {
                        groups.map(group => {
                            return (
                                <GroupItem key={group.id} id={group.id}/>
                            )
                        })
                    }
                </ul>
                 :
                <div>No results</div>
                }
            </section>
        </div>
    </main>
  )
}

export default SearchResults
