import React from 'react'
import SessionsSorter from './SessionSorter';
import useSearch from '../hooks/useSearch';
import Button from '../../../components/shared/button';
import { TbSearch } from 'react-icons/tb';

function SessionSearch() {
    const { loading, sortBy, handleSort, sessions, handleInput } = useSearch()

    return (
        <div className='sessions_search'>
            <input
                className='search_input'
                placeholder="Search by name or address"
            />
            <div className='float_right'>
                <SessionsSorter sortBy={sortBy} setSortBy={handleSort} />
                {/* <SessionsSorter sortBy={sortBy} setSortBy={handleSort} /> */}
                <Button
                    icon={TbSearch}
                    label="Search"
                    styles="primary"
                    action={() => alert("Coming Soon")}
                />
            </div>
        </div>
    )
}

export default SessionSearch
