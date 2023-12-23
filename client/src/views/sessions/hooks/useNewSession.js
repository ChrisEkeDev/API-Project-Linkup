import { useState, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { getEndDate, getDateObject } from "../../../helpers/dateHelpers";
import { thunkCreateNewSession } from "../../../store/sessions";
import { geocodeAddress } from "../../../helpers/geocodeAddress";

function useNewSession() {
    const { dispatch, navigate, setLoading } = useApp();
    const [ addressQuery, setAddressQuery ] = useState("");
    const [ addressObject, setAddressObject ] = useState({});
    const [ status, setStatus ] = useState(null);
    const [ sessionData, setSessionData ] = useState({
        name: '',
        startDate: '',
        endDate: '',
        address: '',
        duration: 1,
        private: false
    });
    const [ errors, setErrors ] = useState({});

    const verifyAddress = async (e) => {
        const addressObj = await geocodeAddress(e, addressQuery, setStatus);
        setAddressObject(addressObj);
    }

    // Handles the input of the Session Form
    const handleInput = (x) => {
        setSessionData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
        if (x.target.id === "address") {
            setAddressQuery(x.target.value)
        }
    }

    const createSession = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const data = await dispatch(thunkCreateNewSession(sessionData));
            navigate(`/sessions/${data.data.id}`)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }


    // Session form input validation error handler
    useEffect(() => {
        const errors = {};
        const { name, startDate, duration, address, endDate } = sessionData;
        if (name && name.trim().length < 3) {
            errors.name = "Please enter a name for your session."
        }
        if (status !== "success") {
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
    }, [sessionData.name, status, sessionData.endDate, sessionData.startDate, sessionData.endDate, sessionData.address ])


    // Resets the address verification if the address changes
    useEffect(() => {
        setStatus(null);
        setAddressObject({})
    }, [addressQuery])


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
        errors,
        handleInput,
        status,
        verifyAddress,
        createSession,
    };
}


export default useNewSession;
