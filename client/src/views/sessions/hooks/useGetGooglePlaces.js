import React, { useState } from 'react'
import { getGooglePlaces } from "../../../store/googlePlaces";
import { useQuery, useMutation, useQueryClient } from 'react-query';

function useGetGooglePlaces() {
    const [ query, setQuery ] = useState("");
    const [ queryResults, setQueryResults ] = useState([]);



    const handleErrors = (newErrors) => {
        // handleAlerts(deleteTeamError)
        console.log(newErrors)
    }

    const handleSuccess = (data) => {
        setQueryResults(data)
    }

    const {
        mutate: getPlaces,
        isLoading: placesLoading
    } = useMutation({
        mutationFn: getGooglePlaces,
        onError: handleErrors,
        onSuccess: handleSuccess
    })



    return { query, setQuery, placesLoading, getPlaces, queryResults }
}

export default useGetGooglePlaces