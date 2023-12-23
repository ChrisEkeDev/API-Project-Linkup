import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkRestorePlayerSession } from "../store/auth";


const useAuth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
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

    return { auth, isAuthenticated };
}


export default useAuth;
