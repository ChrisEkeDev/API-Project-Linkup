import { motion } from 'framer-motion';
import { useApp } from '../../../context/AppContext';
import { format, parseISO } from 'date-fns';
import Button from '../../../components/shared/button';
import { TbEye, TbLogout } from 'react-icons/tb';
import React from 'react'

function CheckInListItem({checkIn}) {
    const parsedDate = parseISO(checkIn.session.startDate);
    const formattedTime = format(parsedDate, 'MM/dd @ h:mm a');
    const { navigate } = useApp();

    return (
        <div className="check_in_list_item flex_spaced">
            <div>
                <p className='sm'>{checkIn.session.name}</p>
                <p className='sm bold'>{checkIn.session.Court.address}</p>
                <p className='md bold'>{formattedTime}</p>
            </div>
            <Button
                label="View Session"
                icon={TbEye}
                styles="secondary"
                action={() => navigate(`/sessions/${checkIn.session.id}`)}
            />
        </div>
    )
}

export default CheckInListItem
