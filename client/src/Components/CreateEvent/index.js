import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useLoading } from '../../context/LoadingProvider';
import { useAlerts } from '../../context/AlertsProvider';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateEvent } from '../../store/events';
import { FaAngleLeft } from 'react-icons/fa';
import Inputs from './shared/Inputs/Inputs';
import TextArea from '../Inputs/TextArea';
import Button from '../Buttons/Button';
import Select from '../Inputs/Select';
import DateTime from '../Inputs/DateTime';
import Number from '../Inputs/Number';
import Image from '../Inputs/Image';
import Price from '../Inputs/Price';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import './CreateEvent.css';

function CreateEvent() {
    const { groupId } = useParams();
    const { setLoading } = useLoading();
    const { handleAlerts } = useAlerts();
    const [ venueId, setVenueId ] = useState(null)
    const [ name, setName ] = useState('');
    const [ type, setType ] = useState('none');
    const [ price, setPrice ] = useState('0.00');
    const [ capacity, setCapacity ] = useState(0);
    const [ startDateDate, setStartDateDate ] = useState('')
    const [ startDateTime, setStartDateTime ] = useState('')
    const [ endDateDate, setEndDateDate ] = useState('')
    const [ endDateTime, setEndDateTime ] = useState('')
    const [ isPrivate, setIsPrivate ] = useState('none');
    const [ image, setImage ] = useState(undefined)
    const [ description, setDescription] = useState('');
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const group = useSelector(state => state.groups.singleGroup);


    let venues = []
    venues = group?.Venues?.map((venue) => {
        const venueObj = {};
        venueObj.value = venue.id;
        venueObj.label = `${venue.address} ${venue.city}, ${venue.state}`
        return venueObj
    })

    const visibilities = [
        {value: true, label: 'Private'},
        {value: false, label: 'Public'}
    ]

    const types = [
        {value: 'In person', label: 'In person'},
        {value: 'Online', label: 'Online'}
    ]


    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const eventStart = `${startDateDate} ${startDateTime}`;
            const eventEnd = `${endDateDate} ${endDateTime}`;
            const eventData = {
                venueId: parseInt(venueId),
                name,
                type,
                capacity: parseInt(capacity),
                price: parseInt(price),
                description,
                private: isPrivate  === 'Private' ? true : false,
                startDate: eventStart,
                endDate: eventEnd
            }


            const imageData = {
                preview: true,
                image
            }
            let formData = null;
            if (image) {
                formData = new FormData();
                formData.append("image", imageData.image)
                formData.append("preview", imageData.preview)
            }
            const newEvent = await dispatch(thunkCreateEvent(group.id, eventData, formData))
            handleAlerts({message: 'Event created successfully'})
            history.push(`/events/${newEvent.id}`)
        } catch(error) {
            const {errors} = await error.json();
            setErrors(errors)
            handleAlerts({message: "There was an error while creating your event."})
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const errors = {};
        if (name.trim().length === 0) {
            errors.name = 'Name is required';
        }
        if (name.trim().length < 5 || name.trim().length > 60) {
            errors.name = 'Name must be between 5 and 60 characters';
        }
        if (description.trim().length === 0) {
            errors.description = 'Description is required';
        }
        if (description.trim().length < 50) {
            errors.description = 'Description must be at least 50 characters';
        }
        if (type === 'none') {
            errors.type = 'Group Type must be either "In person" or "Online"';
        }
        if (isPrivate === 'none') {
            errors.private = 'Visibility Type must be either "Private" or "Public"';
        }
        const priceRegex = /^\d+(?:\.\d+)?(?:,\d+(?:\.\d{2})?)*$/;
        if (!priceRegex.test(price)) {
            errors.price = 'Price is invalid Ex: 50.00'
        }
        const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png']
        if (image && !validFileTypes.find(type => type === image.type)) {
            errors.image = "Please select a valid file type (png, jpg)"
        }
        setErrors(errors)
    }, [name, description, type, isPrivate, price, image, startDateDate, startDateTime, endDateDate, endDateTime])

    if (!group) return <Redirect to='/' />

    return (
        <main className='create_event-wrapper'>
            <div className='create_event-contents'>
                <div className='group-back' onClick={history.goBack}>
                    <FaAngleLeft className='back-icon'/>
                    Back
                </div>
                <header className='create_event-header'>
                <h3 className='body green'>START AN EVENT</h3>
                <h2 className='subheading'>Create an event for {group?.name}</h2>
                </header>
                <form className='create_event-form' onSubmit={submit}>
                    <fieldset className='create_event-fieldset'>
                        <Inputs
                            label='What is the name of your event?'
                            placeholder='Event Name'
                            name='name'
                            value={name}
                            setValue={(x) => setName(x.target.value)}
                            error={errors.name}
                        />
                    </fieldset>
                    <fieldset className='create_event-fieldset'>
                        <Select
                            label='Is this an in person or online event?'
                            placeholder='select one'
                            name='type'
                            values={types}
                            value={type}
                            setValue={(x) => setType(x.target.value)}
                            error={errors.type}
                        />
                        {
                            type === 'In person' ?
                            <Select
                                label='Please select a venue'
                                placeholder='select one'
                                name='venueId'
                                values={venues}
                                value={venueId}
                                setValue={(x) => setVenueId(x.target.value)}
                                error={errors.venueId}
                            /> :
                            null
                        }
                    </fieldset>
                    <fieldset className='create_event-fieldset'>
                        <Select
                            label='Is this event private or public?'
                            placeholder='select one'
                            name='private'
                            values={visibilities}
                            value={isPrivate}
                            setValue={(x) => setIsPrivate(x.target.value)}
                            error={errors.private}
                        />
                        <Price
                            label='What is the price for your event?'
                            value={price}
                            setValue={(x) => setPrice(x.target.value)}
                            name='price'
                            error={errors.price}
                        />
                        <Number
                            value={capacity}
                            setValue={(x) => setCapacity(x.target.value)}
                            label='What is the capacity for your event? - Select (0) for No Capacity'
                            name='capacity'
                            error={errors.capacity}
                        />
                    </fieldset>
                    <fieldset className='create_event-fieldset'>
                        <DateTime
                            name='startDate'
                            dateValue={startDateDate}
                            setDateValue={(x) => setStartDateDate(x.target.value)}
                            timeValue={startDateTime}
                            setTimeValue={(x) => setStartDateTime(x.target.value)}
                            label='When does your event start?'
                            error={errors.startDate}
                        />
                        <DateTime
                            name='endDate'
                            dateValue={endDateDate}
                            setDateValue={(x) => setEndDateDate(x.target.value)}
                            timeValue={endDateTime}
                            setTimeValue={(x) => setEndDateTime(x.target.value)}
                            label='When does your event end?'
                            error={errors.endDate}
                        />
                    </fieldset>
                    <fieldset className='create_event-fieldset'>
                        <div className='image_upload--wrapper'>
                        <span className='image_upload--label'>Upload an image for your event.</span>
                        <Image
                            type='group'
                            name='image'
                            value={image}
                            setValue={setImage}
                            error={errors.image}
                        />
                        </div>
                    </fieldset>
                    <fieldset className='create_event-fieldset'>
                        <TextArea
                            label='Please describe your event'
                            placeholder='Please write at least 30 characters'
                            value={description}
                            setValue={(x) => setDescription(x.target.value)}
                            name='about'
                            error={errors.description}
                        />
                    </fieldset>
                    <Button
                        style='create_event-btn small-btn'
                        label='Create Event'
                        type='primary'
                        disabled={Object.keys(errors).length}
                    />
                </form>
            </div>
        </main>
    )
}

export default CreateEvent
