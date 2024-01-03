import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkRestorePlayerSession, thunkSignOutPlayer } from "../store/auth";


const useAuth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth.player)
    const [ isAuthenticated, setIsAuthenticated ] = useState(auth ? true : false);

    const signOut = async () => {
        try {
            const res = await dispatch(thunkSignOutPlayer())
            if (res.status === 201) {
                // Handle Alerts
                history.push('/sign-in')
            } else {
                throw new Error()
            }
        } catch(e) {
            console.log(e)
            // Handle Alerts
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await dispatch(thunkRestorePlayerSession())
                if (res.status === 200) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
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
