import React from 'react';
import Button from '../Shared/components/Button';
import { TbSearch } from 'react-icons/tb';
import './Styles.scss';

function Search() {
  return (
    <section className='search--wrapper'>
      <TbSearch className="icon"/>
      <input className='search--input' placeholder='Search by name or location'/>
    </section>
  )
}

export default Search
