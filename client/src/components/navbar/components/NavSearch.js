import React from 'react'
// import Input from '../../shared/inputs/textInput'
import IconButton from '../../shared/button/IconButton'
import { TbSearchC } from 'react-icons/tb'
import { IoSearchCircle } from "react-icons/io5";

function NavSearch() {
  return (
    <div className='nav-search'>
        <input
            className='search'
            placeholder="Search by name or address"
        />
        {/* <IconButton
            icon={IoSearchCircle}
            styles=""
            action={() => alert("Coming Soon")}
        /> */}
    </div>
  )
}

export default NavSearch
