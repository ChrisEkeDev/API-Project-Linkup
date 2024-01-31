import { useState, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { sessionsAlerts } from "../../../constants/alerts";
import { getDateData } from "../../../helpers/dateHelpers";
import { useMutation, useQueryClient } from 'react-query';
import { updateSession } from "../../../store/sessions";
import { convertDateToUI, convertTimeToUI, getDuration } from "../../../helpers/dateTimeFormatters";


const useUpdateSession = (session) => {
    const client = useQueryClient();
    const { navigate, handleAlerts } = useApp();
    const { updateSessionSuccess, updateSessionError } = sessionsAlerts;
    const [ errors, setErrors ] = useState({});
    const [ sessionData, setSessionData ] = useState({
        id: session.id,
        name: session.name ,
        startDate: session.startDate,
        date: convertDateToUI(session.startDate),
        time: convertTimeToUI(session.startDate),
        duration: getDuration(session.startDate, session.endDate),
        hostId: session.hostId,
        private: session.private
    });


    // Handles the input of the Session Form
    const handleInput = (x) => {
        setSessionData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
    }

    const handleToggle = () => {
        setSessionData((prev) => ({ ...prev, private: !sessionData.private }));
    }

    const handleHost = (id) => {
        setSessionData((prev) => ({ ...prev, hostId: id }));
    }

    const handleErrors = (newErrors) => {
        const newState = { ...errors, ...newErrors };
        handleAlerts(updateSessionError)
        setErrors(newState)
    }

    const handleSuccess = (data) => {
        client.setQueryData(['session'], data.id)
        client.invalidateQueries(['session'])
        handleAlerts(updateSessionSuccess)
        navigate(`/sessions/${data.id}`)
    }

    const {
        mutate: handleSubmit,
        isLoading: updateSessionLoading
    } = useMutation({
        mutationFn: updateSession,
        onError: handleErrors,
        onSuccess: handleSuccess
    })

    const onUpdateSession = async (e) => {
        e.preventDefault();
        handleSubmit(sessionData)
    }



    // Session form input validation error handler
    useEffect(() => {
        const errors = {};
        const { name, startDate, duration } = sessionData;
        if (name && name.trim().length < 3) {
            errors.name = "Please enter a name for your session."
        }

        if (!startDate || startDate < new Date()) {
            errors.date = "Please enter a valid date and time.";
            errors.time = "Enter a valid time."
        }

        if (!duration) {
            errors.duration = "Enter a duration"
        }
        setErrors(errors)
    }, [sessionData.name, sessionData.endDate, sessionData.startDate, sessionData.endDate  ])


    // Convert and store the date if the date or time keys change on the sesssion data
    useEffect(() => {
        const { startDate , endDate } = getDateData(sessionData.date, sessionData.time, sessionData.duration)
        setSessionData((prev) => ({...prev, startDate: startDate , endDate: endDate}))
    }, [sessionData.date, sessionData.time, sessionData.duration])

    return {
        sessionData,
        errors,
        handleInput,
        handleHost,
        handleToggle,
        updateSessionLoading,
        onUpdateSession,
    };
}

export default useUpdateSession;
