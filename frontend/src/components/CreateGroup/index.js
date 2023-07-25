import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlerts } from '../../context/AlertsProvider';
import { useLoading } from '../../context/LoadingProvider';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateGroup } from '../../store/groups';
import { FaAngleLeft } from 'react-icons/fa';
import Inputs from '../Inputs/Inputs';
import TextArea from '../Inputs/TextArea';
import Button from '../Buttons/Button';
import Select from '../Inputs/Select';
import Image from '../Inputs/Image';
import { states } from '../../utils/states';
import './CreateGroup.css';

function CreateGroup() {
    const user = useSelector(state => state.session.user);
    const { setLoading } = useLoading();
    const { handleAlerts } = useAlerts();
    const [ name, setName ] = useState('');
    const [ about, setAbout ] = useState('');
    const [ type, setType ] = useState('none');
    const [ isPrivate, setIsPrivate ] = useState('none');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('none');
    const [ image, setImage ] = useState(undefined)
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const visibilities = [
        {value: true, label: 'Private'},
        {value: false, label: 'Public'}
    ]

    const types = [
        {value: 'In person', label: 'In person'},
        {value: 'Online', label: 'Online'}
    ]

    const normalizedStates = states.map(state => {
        return { value: state, label: state}
    })

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        validateForm();
        if (!Object.values(errors).length) {
            try {
                const groupData = {
                    organizerId: user.id,
                    name,
                    about,
                    type,
                    private: isPrivate === 'Private' ? true : false,
                    city,
                    state
                }
                const imageData = {
                    preview: true,
                    image
                }
                const formData = new FormData();
                formData.append("image", imageData.image)
                formData.append("preview", imageData.preview)
                const newGroup = await dispatch(thunkCreateGroup(groupData, formData))
                handleAlerts({message: 'Group created successfully'})
                history.push(`/groups/${newGroup.id}`)
            } catch(error) {
                console.log(error)
                handleAlerts({message: "There was an error while creating your group."})
            } finally {
                setLoading(false);
            }
        }

    }

    const validateForm = () => {
        const errors = {};
        if (name.trim().length === 0) {
            errors.name = 'Name is required';
        }
        if (name.trim().length < 5 || name.trim().length > 60) {
            errors.name = 'Name must be between 5 and 60 characters';
        }
        if (about.trim().length === 0) {
            errors.about = 'About is required';
        }
        if (about.trim().length < 50) {
            errors.about = 'About must be at least 50 characters';
        }
        if (type === 'none') {
            errors.type = 'Group Type must be either "In person" or "Online"';
        }
        if (isPrivate === 'none') {
            errors.private = 'Visibility Type must be either "Private" or "Public"';
        }
        if (city.trim().length === 0) {
            errors.city = 'Please enter a city';
        }
        if (state === 'none') {
            errors.state = 'Please select a state';
        }
        const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png']
        if (image && !validFileTypes.find(type => type === image.type)) {
            errors.image = "Please select a valid file type (png, jpg)"
        }
        setErrors(errors)
    }

  return (
    <main className='create_group-wrapper'>
        <div className='create_group-contents'>
            <div className='group-back' onClick={history.goBack}>
                <FaAngleLeft className='back-icon'/>
                Back
            </div>
            <header className='create_group-header'>
                <h3 className='body green'>BECOME AN ORGANIZER</h3>
                <h2 className='subheading'>We'll walk you through a few steps to build your local community</h2>
            </header>
            <form className='create_group-form' onSubmit={submit}>
                <fieldset className='create_group-fieldset'>
                    <h2 className='subheading'>First, set your group's location.</h2>
                    <p className='body subheader'>Linkup groups link locally, in person and online. We'll connect you with people in your area, and more can join you online.</p>
                    <Inputs
                        placeholder='City'
                        value={city}
                        setValue={(x) => setCity(x.target.value)}
                        name='city'
                        error={errors.city}
                    />
                    <Select
                        placeholder='State'
                        value={state}
                        setValue={(x) => setState(x.target.value)}
                        name='state'
                        values={normalizedStates}
                        error={errors.state}
                    />
                </fieldset>
                <fieldset className='create_group-fieldset'>
                    <h2 className='subheading'>What will your group's name be?</h2>
                    <p className='body subheader'>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</p>
                    <Inputs
                        placeholder='What is your group name?'
                        value={name}
                        setValue={(x) => setName(x.target.value)}
                        name='name'
                        error={errors.name}
                    />
                </fieldset>
                <fieldset className='create_group-fieldset'>
                    <h2 className='subheading'>Now describe what your group will be about</h2>
                    <p className='body subheader'>People will see this when we promote your group, but you'll be able to add to it later, too.</p>
                    <ol className='create_group-list'>
                        <li className='body'>What's the purpose of the group?</li>
                        <li className='body'>Who should join?</li>
                        <li className='body'>What will you do at your events?</li>
                    </ol>
                    <TextArea
                        placeholder='Please write at least 30 characters'
                        value={about}
                        setValue={(x) => setAbout(x.target.value)}
                        name='about'
                        error={errors.about}
                    />
                </fieldset>
                <fieldset className='create_group-fieldset'>
                    <h2 className='subheading'>Final steps...</h2>
                    <Select
                        label='Is this an in person or online group?'
                        placeholder='select one'
                        name='type'
                        values={types}
                        value={type}
                        setValue={(x) => setType(x.target.value)}
                        error={errors.type}
                    />
                    <Select
                        label='Is this group private or public?'
                        placeholder='select one'
                        name='private'
                        values={visibilities}
                        value={isPrivate}
                        setValue={(x) => setIsPrivate(x.target.value)}
                        error={errors.private}
                    />
                    <div className='image_upload--wrapper'>
                    <span className='image_upload--label'>Upload an image for your group.</span>
                    <Image
                        type='group'
                        name='image'
                        value={image}
                        setValue={setImage}
                        error={errors.image}
                    />
                    </div>
                </fieldset>
                <Button
                    style='create_group-btn small-btn'
                    label='Create group'
                    type='primary'
                />
            </form>
        </div>
    </main>
  )
}

export default CreateGroup
