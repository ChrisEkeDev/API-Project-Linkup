import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { thunkSearch } from '../../Store/search';
import './Styles.scss';
import { TbSearch } from 'react-icons/tb';

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
    <div className='search--wrapper'>
      <div className='search--contents'>
        <div className='search__address_input--wrapper'>
          <span className='search__icon'>
            <TbSearch/>
          </span>
          <input
            className='search__address_input--input'
            type='text' value={searchQuery}
            onChange={(x) => setSearchQuery(x.target.value)}
            placeholder='Search Event and Groups'
          />
        </div>
        <div className='search__address_input--wrapper'>
          <span className='search__icon'>
            <TbSearch/>
          </span>
          <input
            className='search__address_input--input'
            type='text' value={searchQuery}
            onChange={(x) => setSearchQuery(x.target.value)}
            placeholder='Search Event and Groups'
          />
        </div>
        {/* <div className='search-btn' onClick={() => handleSearch()}>
            <FaSearch className='search-icon'/>
        </div> */}
      </div>
    </div>
  )
}

export default SearchBar
