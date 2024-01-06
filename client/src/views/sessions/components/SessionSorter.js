import { useState, useRef, useEffect } from 'react'
import IconButton from '../../../components/shared/button/IconButton';
import { PiCalendarBold, PiStarBold, PiUsersBold } from "react-icons/pi";
import { sortValues } from "../../../constants/constants";
import '../styles.scss';



const SessionsSorter = ({sortBy, setSortBy}) => {
    const [ menu, setMenu ]= useState(false)
    const ref = useRef(null)
    console.log(sortBy)

    const handleSort = (sort) => {
        setSortBy(sort);
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

    return (
        <div className='sessions_sorter'>
            <span className="sort_label">{sortValues[sortBy]}</span>
            <IconButton
                icon={
                    sortBy === 'startDate' ? PiCalendarBold
                    : sortBy === 'createdAt' ? PiStarBold
                    : PiUsersBold
                }
                action={() => setMenu(!menu)}
            />
            {
                menu &&
                <div ref={ref} className="options_modal">
                    {Object.keys(sortValues).map(option => (
                        <div onClick={() => handleSort(option)} className='modal_option' defaultValue={option}>
                            <div className={`option_node node-${option === sortBy ? 'active' : 'inactive'}`}/>
                            <span className='option_label xs'>{sortValues[option]}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default SessionsSorter;
