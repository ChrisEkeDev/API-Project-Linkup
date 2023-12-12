import React from 'react'
import Input from '../../shared/input'
import IconButton from '../../shared/button/IconButton'
import { TbSearch } from 'react-icons/tb'

function NavSearch() {
  return (
    <div className='nav-search'>
        <input
            className='search'
            placeholder="Search by name or address"
        />
        <IconButton
            icon={TbSearch}
            styles=""
            action={() => alert("Coming Soon")}
        />
    </div>
  )
}

export default NavSearch
