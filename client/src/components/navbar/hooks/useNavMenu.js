import React, { useEffect, useState, useRef } from 'react'
import { thunkSignOutPlayer } from '../../../store/auth';
import { useApp } from '../../../context/AppContext';

const useNavMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { dispatch } = useApp();

    const onMenuOpen = () => {
        setMenuOpen(true)
    }

    const onMenuClose = () => {
        setMenuOpen(false)
    }

    const onOutsideMenuClick = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            onMenuClose()
        }
    }

    const signOut = async () => {
        // Handle Loading
        try {
            const res = await dispatch(thunkSignOutPlayer())
            console.log(res)
            if (res.status === 201) {
                // Handle Alerts
            } else {
                throw new Error()
            }
        } catch(e) {
            console.log(e)
            // Handle Alerts
        } finally {
            // Handle Loading
        }
    }

    useEffect(() => {
        document.addEventListener('click', onOutsideMenuClick)
        return () => {
            document.removeEventListener('click', onOutsideMenuClick)
        }
    }, [])

    return {
        menuRef,
        menuOpen,
        onMenuOpen,
        onMenuClose,
        signOut
    }
}

export default useNavMenu
