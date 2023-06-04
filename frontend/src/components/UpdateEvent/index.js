import React, { useState } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useLoading } from '../../context/LoadingProvider';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSingleEvent, thunkUpdateEvent } from '../../store/events';
import { FaAngleLeft } from 'react-icons/fa';
import Inputs from '../Inputs/Inputs';
import TextArea from '../Inputs/TextArea';
import Button from '../Buttons/Button';
import Select from '../Inputs/Select';
import DateTime from '../Inputs/DateTime';
import Number from '../Inputs/Number';
import Price from '../Inputs/Price';
import '../CreateEvent/CreateEvent.css';

function UpdateEvent() {
    const { groupId } = useParams();
    const event = useSelector(state => state.events.singleEvent)
    const user = useSelector(state => state.session.user);
    const group = useSelector(state => state.groups.singleGroup);

    let venues = []
    venues = event?.Group?.Venues?.map((venue) => {
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
    const [ startDate, startTime ] = event?.startDate?.split(' ') ?? [];
    const [ endDate, endTime ] = event?.endDate?.split(' ') ?? [];
    const { setLoading } = useLoading();
    const [ venueId, setVenueId ] = useState(event?.venueId)
    const [ name, setName ] = useState(event?.name);
    const [ type, setType ] = useState(event?.type);
    const [ price, setPrice ] = useState(event?.price?.toFixed(2));
    const [ capacity, setCapacity ] = useState(event?.capacity);
    const [ startDateDate, setStartDateDate ] = useState(startDate)
    const [ startDateTime, setStartDateTime ] = useState(startTime)
    const [ endDateDate, setEndDateDate ] = useState(endDate)
    const [ endDateTime, setEndDateTime ] = useState(endTime)
    const [ isPrivate, setIsPrivate ] = useState(event?.private);
    const [ description, setDescription] = useState(event?.description);
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    if (!group) return <Redirect to='/' />

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        validateForm();
        if(!Object.values(errors).length) {
            const eventStart = `${startDateDate} ${startDateTime}`;
            const eventEnd = `${endDateDate} ${endDateTime}`;
            const eventData = {
                venueId: parseInt(venueId),
                name,
                type,
                capacity: parseInt(capacity),
                price: parseInt(price),
                description,
                startDate: eventStart,
                endDate: eventEnd
            }
            return (
                dispatch(thunkUpdateEvent(eventData, event.id))
                .then((newEvent) => {
                    setLoading(false);
                    history.push(`/events/${newEvent.id}`)
                })
                .catch(async(errors) => {
                    const data = await errors.json();
                    if (data && data.errors) setErrors(data.errors)
                    setLoading(false)
                })
            )
        }
        setLoading(false);
    }

    const validateForm = () => {
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
        setErrors(errors)
    }

    return (
        <main className='create_event-wrapper'>
            <div className='create_event-contents'>
                <div className='group-back' onClick={history.goBack}>
                    <FaAngleLeft className='back-icon'/>
                    Back
                </div>
                <header className='create_event-header'>
                    <h3 className='body green'>UPDATE AN EVENT</h3>
                    <h2 className='subheading'>Update the event for {group?.name}</h2>
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
                        style='create_event-btn'
                        label='Update Event'
                        type='primary'
                    />
                </form>
            </div>
        </main>

    )
}

export default UpdateEvent
