import { useState, useRef, useEffect } from 'react'
import IconButton from '../../../components/shared/button/IconButton';
import { TbCalendarDue, TbStar, TbUsersGroup } from "react-icons/tb";
import { sessionSortValues, teamSortValues } from "../../../constants/constants";
import '../styles.scss';



const Sorter = ({tab, sortBy, handleSort}) => {
    const [ menu, setMenu ]= useState(false)
    const ref = useRef(null)

    const values = tab === 'teams' ? teamSortValues : sessionSortValues;

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
    }, [tab])

    return (
        <div className='sorter'>
            <span className="sorter_label">{values[sortBy]}</span>
            <IconButton
                icon={
                    sortBy === 'startDate' ? TbCalendarDue
                    : sortBy === 'createdAt' ? TbStar
                    : TbUsersGroup
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
