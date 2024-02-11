import React from 'react'
import { useApp } from '../../../context/AppContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toggleLocations, toggleNotifications, toggleThemes, getMySettings } from '../../../store/auth';

function useSettings() {
   const client = useQueryClient();
   const { handleAlerts } = useApp();

   const {
      data: settings,
      isLoading: settingsLoading
   } = useQuery(['settings'], getMySettings)

   const handleToggleSettingsSuccess = () => {
      client.invalidateQueries(['settings'])
   }

   const handleToggleSettingsError = () => {
      handleAlerts({})
   }

   const { mutate: handleToggleThemes } = useMutation({
      mutationFn: toggleThemes,
      onSuccess: handleToggleSettingsSuccess,
      onError: handleToggleSettingsError
   })

   const onToggleTheme = async () => {
      try {
         handleToggleThemes()
      } catch (e) {
        console.error(e)
      }
   }

   const { mutate: handleToggleLocations } = useMutation({
      mutationFn: toggleLocations,
      onSuccess: handleToggleSettingsSuccess,
      onError: handleToggleSettingsError
   })

   const onToggleLocations = async () => {
      try {
         handleToggleLocations()
      } catch (e) {
        console.error(e)
      }
   }

   const { mutate: handleToggleNotifications } = useMutation({
      mutationFn: toggleNotifications,
      onSuccess: handleToggleSettingsSuccess,
      onError: handleToggleSettingsError
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
