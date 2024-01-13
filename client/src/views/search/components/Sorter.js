import { useState, useRef, useEffect } from 'react'
import IconButton from '../../../components/shared/button/IconButton';
import { PiCalendarFill, PiStarFill, PiUsersFill } from "react-icons/pi";
import { sessionSortValues, teamSortValues } from "../../../constants/constants";
import '../styles.scss';



const Sorter = ({showingResults, sortBy, handleSort}) => {
    const [ menu, setMenu ]= useState(false)
    const ref = useRef(null)

    const values = showingResults === 'teams' ? teamSortValues : sessionSortValues;

    const handleSorter = (sort) => {
        handleSort(sort);
        setMenu(false)
    }

    const handleOutsideClick = (e) => {
        if (ref?.current && !ref?.current.contains(e.target)) {
            setMenu(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick, true)
        return () => document.removeEventListener('click', handleOutsideClick, true)
    }, [])

    useEffect(() => {
        handleSort('createdAt')
    }, [showingResults])

    return (
        <div className='sorter'>
            <span className="sorter_label">{values[sortBy]}</span>
            <IconButton
                icon={
                    sortBy === 'startDate' ? PiCalendarFill
                    : sortBy === 'createdAt' ? PiStarFill
                    : PiUsersFill
                }
                action={() => setMenu(!menu)}
            />
            {
                menu &&
                <div ref={ref} className="options_modal">
                    {Object.keys(values).map(option => (
                        <div onClick={() => handleSorter(option)} className='modal_option' defaultValue={option}>
                            <div className={`option_node node-${option === sortBy ? 'active' : 'inactive'}`}/>
                            <span className='option_label xs'>{values[option]}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Sorter;
