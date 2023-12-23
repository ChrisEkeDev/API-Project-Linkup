import { useState, useRef, useEffect } from 'react'
import IconButton from '../../../components/shared/button/IconButton';
import { TbSortAscending } from "react-icons/tb";
import { sortValues } from "../../../constants/constants";
import '../styles.scss';



const SessionsSorter = ({sortBy, setSortBy}) => {
    const [ menu, setMenu ]= useState(false)
    const ref = useRef(null)

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
            <IconButton
                icon={TbSortAscending}
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


            {/* <select defaultValue={sortBy} onChange={(x) => setSortBy(x.target.value)} className='select'>
                {Object.keys(sortValues).map(key => (
                    <option value={key}>{sortValues[key]}</option>
                ))}
            </select> */}
        </div>
    )
}

export default SessionsSorter;
