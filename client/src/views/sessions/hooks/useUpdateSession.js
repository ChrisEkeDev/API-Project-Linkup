import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useApp } from "../../../context/AppContext";
import { getEndDate, getDateObject } from "../../../helpers/dateHelpers";
import { thunkUpdateSession } from "../../../store/sessions";
import { convertDateToUI, convertTimeToUI, getDuration } from "../../../helpers/dateTimeFormatters";
import { geocodeAddress } from "../../../helpers/geocodeAddress";


const useUpdateSession = (session) => {
    const { dispatch, navigate, setLoading } = useApp();
    const [ addressQuery, setAddressQuery ] = useState(session?.address);
    const [ addressObject, setAddressObject ] = useState({});
    const [ status, setStatus] = useState(null)
    const [ errors, setErrors ] = useState({});
    const [ sessionData, setSessionData ] = useState({
        name: session?.name ,
        address: session?.Court?.address,
        startDate: session.startDate,
        date: convertDateToUI(session.startDate),
        time: convertTimeToUI(session.startDate),
        duration: getDuration(session.startDate, session.endDate),
        // private: session.private
    });


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

    const updateSession = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const data = await dispatch(thunkUpdateSession(sessionData, session.id));
            navigate(`/sessions/${data.data.id}`)
        } catch (e) {
            console.log(e)
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

        if (!startDate || startDate < new Date()) {
            errors.date = "Please enter a valid date and time.";
            errors.time = "Enter a valid time."
        }

        if (!duration) {
            errors.duration = "Enter a duration"
        }
        setErrors(errors)
    }, [sessionData.name, status,sessionData.endDate, sessionData.startDate, sessionData.endDate, sessionData.address ])


    // Resets the address verification if the address changes
    useEffect(() => {
        setStatus(null);
        setAddressObject({})
    }, [addressQuery])


    // Convert and store the date if the date or time keys change on the sesssion data
    useEffect(() => {
        getDateObject(sessionData, sessionData.date, sessionData.time, setSessionData)
        console.log(sessionData.time)
    }, [sessionData.date, sessionData.time])

    // Gets the End date from the duration value
    useEffect(() => {
        getEndDate(sessionData, sessionData.duration, setSessionData)
    }, [sessionData.duration]);


    return {
        sessionData,
        addressObject,
        errors,
        handleInput,
        verifyAddress,
        updateSession,
        status
    };
}

export default useUpdateSession;
