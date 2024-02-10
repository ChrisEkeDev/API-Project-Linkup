import { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../../../context/AppContext";
import { sessionsAlerts } from '../../../constants/alerts'
import { getDateData } from "../../../helpers/dateHelpers";
import { useMutation, useQueryClient } from 'react-query';
import { convertDateToUI, convertTimeToUI, getDuration } from "../../../helpers/dateTimeFormatters";
import { useParams } from 'react-router-dom';
import { createSession, updateSession, deleteSession } from "../../../store/sessions";
import useGetGooglePlaces from "./useGetGooglePlaces";

function useSession({session}) {
    const today = new Date().toISOString();
    const { id } = useParams()
    const { navigate, handleAlerts } = useApp();
    const { query, setQuery, status, getPlaces, queryResults } = useGetGooglePlaces();
    const client = useQueryClient();
    const [ addressObject, setAddressObject ] = useState(null);
    const [ addressConfirmed, setAddressConfirmed ] = useState(session ? true : false);
    const [ errors, setErrors ] = useState({});
    const [ sessionData, setSessionData ] = useState({
        id: session ? session?.id : null,
        name: session ? session?.name : '',
        startDate: session ? session?.startDate : today,
        date: session ?
            convertDateToUI(session?.startDate) :
            convertDateToUI(today),
        time: session ?
            convertTimeToUI(session?.startDate) :
            convertTimeToUI(today),
        duration: session ?
            getDuration(session?.startDate, session?.endDate) : 1,
        private: session ? session?.private : false,
        address: null
    });

    console.log(sessionData.startDate)

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

    const handleInput = (x) => {
        setSessionData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
        if (x.target.id === "address") {
            setQuery(x.target.value)
        }
    }

    const {
        createSessionSuccess,
        createSessionError,
        updateSessionSuccess,
        updateSessionError,
        deleteSessionSuccess,
        deleteSessionError
    } = sessionsAlerts;

    /////////////////////////////////////////////////////////
    //  Create Session

    const handleCreateSessionSuccess = (data) => {
        handleAlerts(createSessionSuccess)
        client.setQueryData(['session'], data)
        client.invalidateQueries(['session'])
        navigate(`/sessions/${data.id}`)
    }

    const handleCreateSessionError = (data) => {
        handleAlerts(createSessionError)
        console.log(data)
    }

    const onCreateSession = async (e) => {
        e.preventDefault();
        try {
            const session = { ...sessionData }
            session.address = addressObject;
            handleCreateSession(session)
        } catch(e) {
            console.error(e)
        }
    }

    const {
        mutate: handleCreateSession,
        isLoading: createSessionLoading
    } = useMutation({
        mutationFn: createSession,
        onSuccess: handleCreateSessionSuccess,
        onError: handleCreateSessionError
    })



    /////////////////////////////////////////////////////////
    //  Update Session

    const handleUpdateSessionSuccess = (data) => {
        client.setQueryData(['session'], id)
        client.invalidateQueries(['session'])
        handleAlerts(updateSessionSuccess)
        navigate(`/sessions/${id}`)
    }

    const handleUpdateSessionError = (data) => {
        handleAlerts(updateSessionError)
        console.log(data)
    }

    const onUpdateSession = async (e) => {
        e.preventDefault();
        try {
            handleUpdateSession(sessionData)
        } catch (e) {
            console.error(e)
        }
    }

    const {
        mutate: handleUpdateSession,
        isLoading: updateSessionLoading
    } = useMutation({
        mutationFn: updateSession,
        onSuccess: handleUpdateSessionSuccess,
        onError: handleUpdateSessionError
    })



    /////////////////////////////////////////////////////////
    //  Delete Session

    const handleDeleteSessionSuccess = (data) => {
        navigate(`/sessions`)
        client.setQueryData(['session'], data)
        client.invalidateQueries(['session'])
        handleAlerts(deleteSessionSuccess)
    }

    const handleDeleteSessionError = (data) => {
        handleAlerts(deleteSessionError)
        console.log(data)
    }

    const onDeleteSession = async (e) => {
        e.preventDefault();
        try {
            handleDeleteSession(id)
        } catch (e) {
            console.error(e)
        }
    }

    const {
        mutate: handleDeleteSession,
    } = useMutation({
        mutationFn: deleteSession,
        onSuccess: handleDeleteSessionSuccess,
        onError: handleDeleteSessionError
    })



    //////////////////////////////////////////////

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

    useEffect(() => {
        const errors = {};
        const { name, startDate, duration, address, endDate } = sessionData;
        if (name && name.trim().length < 3) {
            errors.name = "Please enter a name for your session."
        }
        if (!addressConfirmed) {
            errors.address ="Please verify your address."
        }

        if (!startDate || new Date(startDate) < new Date()) {
            errors.date = "Date can't be in the past";
        }

        if (!duration) {
            errors.duration = "Enter a duration"
        }
        setErrors(errors)
    }, [sessionData.name, sessionData.date, addressConfirmed, sessionData.endDate, sessionData.startDate, sessionData.endDate, sessionData.address ])




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
        createSessionLoading,
        onGetPlaces,
        onCreateSession,
        updateSessionLoading,
        onUpdateSession,
        onDeleteSession
    }
}

export default useSession;
