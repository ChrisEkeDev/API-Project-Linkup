import { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../../../context/AppContext";
import { sessionsAlerts } from '../../../constants/alerts'
import { getDateData } from "../../../helpers/dateHelpers";
import { useMutation, useQueryClient } from 'react-query';
import { createSession, getGooglePlaces } from "../../../store/sessions";
import { convertDateToUI, convertTimeToUI } from "../../../helpers/dateTimeFormatters";
import useGetGooglePlaces from "./useGetGooglePlaces";

function useNewSession() {
    const today = new Date().toISOString();
    const { navigate, handleAlerts } = useApp();
    const { placesLoading, getPlaces, queryResults } = useGetGooglePlaces();
    const { createSessionSuccess, createSessionError  } = sessionsAlerts;
    const [ addressObject, setAddressObject ] = useState(null);
    const [ addressConfirmed, setAddressConfirmed ] = useState(false);

    const [ sessionData, setSessionData ] = useState({
        name: '',
        startDate: today,
        date: convertDateToUI(today),
        time: convertTimeToUI(today),
        duration: 1,
        address: null,
        private: false
    });
    const [ errors, setErrors ] = useState({});

    const onGetPlaces = async (e) => {
        e.preventDefault()
        setAddressConfirmed(false);
        getPlaces(query)
    }

    const handleToggle = () => {
        setSessionData((prev) => ({ ...prev, private: !sessionData.private }));
    }

    const handleHost = (id) => {
        setSessionData((prev) => ({ ...prev, hostId: id }));
    }


    // Handles the input of the Session Form
    const handleInput = (x) => {
        setSessionData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
        if (x.target.id === "address") {
            setQuery(x.target.value)
        }
    }

    const createSession = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const session = { ...sessionData }
            session.address = addressObject;
            const data = await dispatch(thunkCreateNewSession(session));
            handleAlerts(createSessionSuccess)
            navigate(`/sessions/${data.data.id}`)
        } catch (e) {
            handleAlerts(createSessionError)
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const handleAddressObject = (rawData) => {
        const addressObject = {
            place_id: rawData.place_id,
            address: rawData.formatted_address,
            lat: rawData.geometry.location.lat,
            lng: rawData.geometry.location.lng,
        }
        setAddressObject(addressObject);
        setAddressConfirmed(true)
    }


    // Session form input validation error handler
    useEffect(() => {
        const errors = {};
        const { name, startDate, duration, address, endDate } = sessionData;
        if (name && name.trim().length < 3) {
            errors.name = "Please enter a name for your session."
        }
        if (!addressObject) {
            errors.address ="Please verify your address."
        }

        if (!startDate || startDate < new Date()) {
            errors.date = "Please enter a valid date and time.";
            errors.time = "Enter a valid time."
        }

        if (!duration) {
            errors.duration = "Enter a duration"
        }
        setErrors(errors)
    }, [sessionData.name, addressConfirmed, sessionData.endDate, sessionData.startDate, sessionData.endDate, sessionData.address ])


    // Resets the address verification if the address changes
    useEffect(() => {
        setAddressConfirmed(false);
        setQueryResults([])
        setStatus(null)
    }, [query])


    // Convert and store the date if the date or time keys change on the sesssion data
    useEffect(() => {
        const { startDate , endDate } = getDateData(sessionData.date, sessionData.time, sessionData.duration)
        setSessionData((prev) => ({...prev, startDate: startDate , endDate: endDate}))
    }, [sessionData.date, sessionData.time, sessionData.duration])


    return {
        sessionData,
        addressObject,
        handleAddressObject,
        addressConfirmed,
        status,
        queryResults,
        errors,
        handleInput,
        handleHost,
        handleToggle,
        onGetPlaces,
        createSession,
    };
}


export default useNewSession;
