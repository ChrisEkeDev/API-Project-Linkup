import React from 'react'
import { useApp } from '../../context/AppContext';
import { useDispatch } from 'react-redux';
import { TbMapPinQuestion , TbMapPinCheck , TbExclamationCircle, TbLocation } from 'react-icons/tb';
import { CgSpinner } from "react-icons/cg";
import Input from '../../Shared/components/Inputs/Input'
import Button from '../../components/shared/button';
import DateInput from '../../Shared/components/Inputs/DateInput';
import { thunkCreateNewSession } from '../../Store/sessions';
import TimeInput from '../../Shared/components/Inputs/TimeInput';
import DurationInput from '../../Shared/components/Inputs/DurationInput';
import { sessionsAlerts } from "../../constants/alerts";
import useSessionValidation from './hooks/useSessionValidation';
import Back from '../../components/shared/button/Back';



function NewSession() {
    // const dispatch = useDispatch();
    // const { navigate, setLoading, handleAlerts } = useApp();
    // const { createSessionError, createSessionSuccess } = sessionsAlerts;

    // const  [
    //     sessionData,
    //     errors,
    //     handleSessionInput,
    //     geocodeAddress,
    //     status,
    // ] = useSessionValidation();

    // const createNewSession = async (e) => {
    //     setLoading(true);
    //     e.preventDefault();
    //     try {
    //         const data = await dispatch(thunkCreateNewSession(sessionData));
    //         handleAlerts(createSessionSuccess);
    //         navigate(`/sessions/${data.data.id}`)
    //     } catch (error) {
    //         handleAlerts(createSessionError);
    //         console.error(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

  return (
    <main className='page new-session'>
        <header className='header'>
            <Back/>
            <div className='actions'>

            </div>
        </header>
    </main>
    // <PageWrapper>
    //     <PageSection>
    //     <SectionHeader>
    //         <Back/>
    //     </SectionHeader>
    //         <form className='session--form'>
    //             <h2>Create New Session</h2>
    //             <Input
    //                 label="Name"
    //                 placeholder='Hoops at the Parks'
    //                 value={sessionData?.name}
    //                 setValue={handleSessionInput}
    //                 name='name'
    //                 error={errors?.name}
    //                 disabled={false}
    //             />
    //             <div className='form--flex'>
    //                 <Input
    //                     label="Full Address"
    //                     placeholder='123 Fake St, City, ST'
    //                     value={sessionData?.address}
    //                     setValue={handleSessionInput}
    //                     name='address'
    //                     error={errors?.address}
    //                     disabled={false}
    //                 />
    //                 <Button
    //                     label={
    //                         status === "loading" ? "Loading"
    //                         : status === "success" ? "Address Verified"
    //                         : "Verify Address"
    //                     }
    //                     styles={`page--button ${status !== "success" ? "secondary" : "primary"}`}
    //                     icon={
    //                         status === "loading" ? CgSpinner :
    //                         status === "success" ? TbMapPinCheck  :
    //                         TbMapPinQuestion
    //                     }
    //                     action={geocodeAddress}
    //                 />
    //             </div>
    //             <div className='date--flex'>
    //                 <DateInput
    //                     label="Date"
    //                     name="date"
    //                     value={sessionData?.date}
    //                     setValue={handleSessionInput}
    //                     error={errors?.date}
    //                     disabled={false}
    //                 />
    //                 <TimeInput
    //                     label="Time"
    //                     name="time"
    //                     value={sessionData?.time}
    //                     setValue={handleSessionInput}
    //                     error={errors?.time}
    //                     disabled={false}
    //                 />
    //                 <DurationInput
    //                     label="Duration (Hours)"
    //                     name="duration"
    //                     value={sessionData?.duration}
    //                     setValue={handleSessionInput}
    //                     error={errors?.duration}
    //                     disabled={false}
    //                 />
    //             </div>
    //             <div className='session_single_page--actions'>
    //                 <Button
    //                     label="Create Session"
    //                     styles="primary page--button"
    //                     disabled={Object.keys(errors).length}
    //                     action={createNewSession}
    //                 />
    //             </div>
    //         </form>
    //     </PageSection>
    // </PageWrapper>
  )
}

export default NewSession
