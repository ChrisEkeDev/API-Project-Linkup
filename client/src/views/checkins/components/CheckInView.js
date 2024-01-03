import { useState, useRef, useEffect } from 'react'
import IconButton from '../../../components/shared/button/IconButton';
import { TbSortAscending } from "react-icons/tb";
import { viewValues } from "../../../constants/constants";
import '../styles.scss';

function CheckInView({view, setView}) {
    const [ menu, setMenu ]= useState(false)
    const ref = useRef(null)

    const handleView = (view) => {
        setView(view);
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
            <span className="sort_label">{viewValues[view]}</span>
            <IconButton
                icon={TbSortAscending}
                action={() => setMenu(!menu)}
            />
            {
                menu &&
                <div ref={ref} className="options_modal">
                    {Object.keys(viewValues).map(option => (
                        <div onClick={() => handleView(option)} className='modal_option' defaultValue={option}>
                            <div className={`option_node node-${option === view ? 'active' : 'inactive'}`}/>
                            <span className='option_label xs'>{viewValues[option]}</span>
                        </div>
                    ))}
                </div>
            }
    </div>
  )
}

export default CheckInView
