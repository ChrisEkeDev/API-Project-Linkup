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

    const handleErrors = (error) => {
        console.error(error)
    }

    const handleSuccess = (data) => {
        setQueryResults(data.data)
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
