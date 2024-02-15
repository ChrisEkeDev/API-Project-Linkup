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
        address: null,
        hostId: session ? session?.hostId : null
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

    const handleSuccess = (data) => {
        handleAlerts(data)
        client.setQueryData(['session'], data.data)
        client.invalidateQueries(['session'])
        navigate(`/sessions/${data.data.id}`)
    }

    const handleError = (error) => {
        handleAlerts(error)
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
        onSuccess: handleSuccess,
        onError: handleError
    })


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
        onSuccess: handleSuccess,
        onError: handleError
    })

    const handleDeleteSessionSuccess = (data) => {
        navigate(`/sessions`)
        client.setQueryData(['session'], data.data)
        client.invalidateQueries(['session'])
        handleAlerts(data)
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
        onError: handleError
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
