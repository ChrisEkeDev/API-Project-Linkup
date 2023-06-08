import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const history = useHistory();

    const handleSearch = () => {

    }

  return (
    <div className='searchbar-wrapper'>
        <input className='search_input query-input' type='text' value={searchQuery} onChange={(x) => setSearchQuery(x.target.value)}/>
        <input className='search_input locations-input' value={searchLocation} onChange={(x) => setSearchLocation(x.target.value)}/>
        <div className='search-btn' onClick={() => handleSearch()}>
            <FaSearch className='search-icon'/>
        </div>
    </div>
  )
}

export default SearchBar
