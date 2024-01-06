import { useEffect, useState } from "react";
import { sessionAlerts, signOutAlerts } from  '../constants/alerts'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkRestorePlayerSession, thunkSignOutPlayer } from "../store/auth";


const useAuth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth.player);
    const { sessionRestored, noSessionFound } = sessionAlerts;
    const { signOutSuccess, signOutFailure } = signOutAlerts;
    const [ isAuthenticated, setIsAuthenticated ] = useState(auth ? true : false);

    const signOut = async () => {
        try {
            const res = await dispatch(thunkSignOutPlayer())
            if (res.status === 201) {
                // handleAlerts(signOutSuccess);
                history.push('/sign-in')
            } else {
                throw new Error()
            }
        } catch(e) {
            // handleAlerts(signOutFailure);
            console.log(e)
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await dispatch(thunkRestorePlayerSession())
                if (res.status === 200) {
                    setIsAuthenticated(true)
                    // handleAlerts(sessionRestored);
                } else {
                    setIsAuthenticated(false)
                    // handleAlerts(noSessionFound);
                    history.push('/sign-in')
                }
            } catch(e) {
                console.log(e)
            }
        }

        if (!auth) {
            checkAuth();
        }

    }, [auth])

    return { auth, signOut, isAuthenticated };
}


export default useAuth;
