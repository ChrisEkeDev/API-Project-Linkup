import { thunkChangeThemePreference, thunkChangeNotificationPreference, thunkChangeLocationPreference } from '../../../store/auth';
import { useEffect, useState } from 'react'
import { useApp } from '../../../context/AppContext';
import { useSelector } from 'react-redux';

import React from 'react'

function useSettings() {
    const { dispatch } = useApp()
    const currentSettings = useSelector(state => state.auth.settings);
    const { theme, notifications, locations } = currentSettings;

     const toggleTheme = async () => {
        const value = theme === 'light' ? 'dark' : 'light';
        try {
            const res = await dispatch(thunkChangeThemePreference(value))
            if (res >= 400) {
                throw new Error()
            }
        } catch(e) {
            console.error(e)
        }
     }

     const toggleLocations = async () => {
        const value = locations === true ? false : true;
        try {
            const res = await dispatch(thunkChangeLocationPreference(value))
            if (res >= 400) {
                throw new Error()
            }
        } catch(e) {
            console.error(e)
        }
     }

     const toggleNotifications = async () => {
        const value = notifications === true ? false : true;
        try {
            const res = await dispatch(thunkChangeNotificationPreference(value))
            if (res >= 400) {
                throw new Error()
            }
        } catch(e) {
            console.error(e)
        }
     }

    return { theme, locations, notifications, toggleTheme, toggleLocations, toggleNotifications }
}

export default useSettings
