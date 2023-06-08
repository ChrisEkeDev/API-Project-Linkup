import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { thunkSearch } from '../../store/search';
import './SearchBar.css';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearch = () => {
      return (
        dispatch(thunkSearch(searchQuery))
        .then(() => history.push('/search-results'))
      )
    }

  return (
    <div className='searchbar-wrapper'>
      <input
        className='search_input query-input'
        type='text' value={searchQuery}
        onChange={(x) => setSearchQuery(x.target.value)}
        placeholder='Search Event and Groups'
      />
      <div className='search-btn' onClick={() => handleSearch()}>
          <FaSearch className='search-icon'/>
      </div>
    </div>
  )
}

export default SearchBar
