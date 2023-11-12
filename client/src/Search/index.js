import React from 'react';
import Button from '../Shared/components/Button';
import { TbSearch } from 'react-icons/tb';
import './Styles.scss';

function Search() {
  return (
    <section className='search_wrapper'>
        <div className='search_contents'>
            <div className='search_icon'>
                <TbSearch/>
            </div>
            <input className='search_input' placeholder='Search by name or location'/>
            {/* <Button type="primary" styles="search_button" label="Search"/> */}
        </div>
    </section>
  )
}

export default Search
