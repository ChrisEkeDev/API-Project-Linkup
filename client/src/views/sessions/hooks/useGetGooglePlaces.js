import React, { useState } from 'react'
import { getGooglePlaces } from "../../../store/googlePlaces";
import { useQuery, useMutation, useQueryClient } from 'react-query';

function useGetGooglePlaces() {
    const [ query, setQuery ] = useState("");
    const [ addressConfirmed, setAddressConfirmed ] = useState(false)
    const [ queryResults, setQueryResults ] = useState([]);


    const resetConfirmation = () => {
        setAddressConfirmed(false)
    }

    const handleConfirmation = (bool) => {
        setAddressConfirmed(bool)
    }

    const handleErrors = (newErrors) => {
        // handleAlerts(deleteTeamError)
        console.log(newErrors)
    }

    const handleSuccess = (data) => {
        setQueryResults(data)
    }

    const {
        mutate: getPlaces,
        status
    } = useMutation({
        mutationFn: getGooglePlaces,
        onMutate: resetConfirmation,
        onError: handleErrors,
        onSuccess: handleSuccess
    })



    return { query, setQuery, status, getPlaces, queryResults, addressConfirmed, handleConfirmation }
}

export default useGetGooglePlaces
