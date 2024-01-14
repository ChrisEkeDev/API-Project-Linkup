import { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../../../context/AppContext";
import { sessionsAlerts } from '../../../constants/alerts'
import { getEndDate, getDateObject } from "../../../helpers/dateHelpers";
import { thunkCreateNewSession } from "../../../store/sessions";

function useNewSession() {
    const { dispatch, navigate, setLoading, handleAlerts } = useApp();
    const { createSessionSuccess,createSessionError  } = sessionsAlerts;
    const [ query, setQuery ] = useState("");
    const [ queryResults, setQueryResults ] = useState([]);
    const [ addressObject, setAddressObject ] = useState(null);
    const [ addressConfirmed, setAddressConfirmed ] = useState(false);
    const [ status, setStatus ] = useState(null)
    const [ sessionData, setSessionData ] = useState({
        name: '',
        startDate: '',
        endDate: '',
        address: '',
        duration: 1,
        private: false
    });
    const [ errors, setErrors ] = useState({});

    const getPlaces = async (e) => {
        e.preventDefault()
        setStatus("loading");
        setAddressConfirmed(false);
        try {
            const response = await axios.post(`/api/places`, { query });
            setQueryResults(response.data.data)
            setStatus("success")
        } catch(e) {
            setStatus("fail")
            console.log(e)
        }

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
            id: rawData.place_id,
            name: rawData.name,
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
        getDateObject(sessionData, sessionData.date, sessionData.time, setSessionData)
    }, [sessionData.date, sessionData.time])

    // Gets the End date from the duration value
    useEffect(() => {
        getEndDate(sessionData, sessionData.duration, setSessionData)
    }, [sessionData.duration])


    return {
        sessionData,
        addressObject,
        handleAddressObject,
        addressConfirmed,
        status,
        queryResults,
        errors,
        handleInput,
        getPlaces,
        createSession,
    };
}


export default useNewSession;
