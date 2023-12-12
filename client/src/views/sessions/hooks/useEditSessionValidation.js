import { useState, useEffect, useCallback } from "react";
import { useApp } from "../../App/Context/AppContext";
import { sessionAlerts } from "../../Shared/constants/alertData";
import { timeFormatOptions } from "../../Shared/constants/predefinedValues";
import { addHours, subHours, getHours } from "date-fns";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSingleSession } from "../../Store/sessions";


function useEditSessionValidation(id) {
    const session = useSelector(state => state.sessions.singleSession);
    const today = new Date();
    const offsetHours = today.getTimezoneOffset() / 60;
    const [ addressQuery, setAddressQuery ] = useState(session.address);
    const startDate = new Date(session.startDate);
    const date = startDate.toISOString().slice(0,19).replace('T', ',').split(',')[0];
    const time = subHours(startDate, offsetHours).toISOString().slice(0,19).replace('T', ',').split(',')[1];
    const duration = getHours(new Date(session?.endDate)) - getHours(new Date(session?.startDate));
    const [ sessionData, setSessionData ] = useState({
        name: session.name ,
        address: session.address,
        startDate: session.startDate,
        date: date,
        time: time,
        duration: duration,
        private: session.private
    });
    const [ status, setStatus] = useState(null)
    const [ errors, setErrors ] = useState({});
    const { handleAlerts } = useApp();
    const dispatch = useDispatch();
    const { couldntVerifyAddress } = sessionAlerts;


    // Handles the input of the Session Form
    const handleSessionInput = (x) => {
        setSessionData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
        if (x.target.id === "address") {
            setAddressQuery(x.target.value)
        }
    }


    // Geocodes the address
    const geocodeAddress = async (e) => {
        e.preventDefault();
        setStatus("loading")
        try {
            const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressQuery)}&key=${apiKey}`;
            const response = await axios.get(apiUrl);
            const { data } = response;
            if (response.status === 200 && data.status === "OK") {
              const location = data.results[0];
              const newData = { ...sessionData };
              newData.address = location.formatted_address;
              newData.lat = location.geometry.location.lat;
              newData.lng = location.geometry.location.lng;
              setSessionData(newData);
              setStatus("success");
            }
        } catch {
            handleAlerts(couldntVerifyAddress);
            setStatus("fail");
        }
    };

    // Converts the date and time inputs into a date object;
    const covnertToDateObject = useCallback((date, time) => {
        const startDate = new Date(date + " " + time);
        const newData = { ...sessionData };
        try {
            newData.startDate = startDate.toISOString();
        } catch(e) {

        }
        setSessionData(newData);
    }, [sessionData])

    // Gets the endDate based on duration value
    const getEndDate = (duration) => {
        const newData = { ...sessionData };
        const endDate = addHours(new Date(newData.startDate), duration);
        try {
            newData.endDate = endDate.toISOString();
        } catch(e) {

        }
        setSessionData(newData);
        console.log(newData)
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
        setStatus(null)
    }, [addressQuery])


    // Convert and store the date if the date or time keys change on the sesssion data
    useEffect(() => {
        covnertToDateObject(sessionData.date, sessionData.time)
    }, [sessionData.date, sessionData.time])

    // Gets the End date from the duration value
    useEffect(() => {
        getEndDate(sessionData.duration)
    }, [sessionData.duration])

    useEffect(() => {
        dispatch(thunkGetSingleSession(id))
    }, [])

    return [ sessionData, errors, handleSessionInput, geocodeAddress, status ];
}

export default useEditSessionValidation;
