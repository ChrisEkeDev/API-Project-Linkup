import { useEffect, useState } from "react";
import { useApp } from '../context/AppContext'
import { useSelector, useDispatch } from "react-redux";
import { thunkRestorePlayerSession } from "../Store/auth";


const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.player)
    const [ isAuthenticated, setIsAuthenticated ] = useState(auth ? true : false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await dispatch(thunkRestorePlayerSession())
                if (res.status === 200) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
            } catch(e) {
                console.log(e)
            }
        }

        if (!auth) {
            checkAuth();
        }

    }, [auth])

    return { auth, isAuthenticated };
}


export default useAuth;
