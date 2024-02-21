import React from 'react'
import { useApp } from '../context/AppContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toggleLocations, toggleNotifications, toggleThemes, getMySettings } from '../store/auth';

function useSettings() {
   const client = useQueryClient();

   const {
      data: settings,
      isLoading: settingsLoading
   } = useQuery(['settings'], getMySettings)
   console.log(settings)

   const handleSuccess = (data) => {
      client.invalidateQueries(['settings'])
   }

   const handleError = (error) => {
   }

   const {
      mutate: handleToggleThemes
   } = useMutation({
      mutationFn: toggleThemes,
      onSuccess: handleSuccess,
      onError: handleError
   })

   const onToggleTheme = async () => {
      try {
         handleToggleThemes()
      } catch (e) {
        console.error(e)
      }
   }

   const {
      mutate: handleToggleLocations
   } = useMutation({
      mutationFn: toggleLocations,
      onSuccess: handleSuccess,
      onError: handleError
   })

   const onToggleLocations = async () => {
      try {
         handleToggleLocations()
      } catch (e) {
        console.error(e)
      }
   }

   const {
      mutate: handleToggleNotifications
   } = useMutation({
      mutationFn: toggleNotifications,
      onSuccess: handleSuccess,
      onError: handleError
   })

   const onToggleNotifications = async () => {
      try {
         handleToggleNotifications()
      } catch (e) {
        console.error(e)
      }
   }

    return {
      settingsLoading,
      settings,
      onToggleTheme,
      onToggleLocations,
      onToggleNotifications
   }
}

export default useSettings
