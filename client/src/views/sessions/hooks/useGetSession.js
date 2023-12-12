import { useEffect, useState } from "react";
import { useApp } from "../../../context/AppContext";
import { thunkGetSingleSession } from "../../../Store/sessions";
import { sessionsAlerts } from "../../../constants/alerts";
import { useDispatch } from "react-redux";
import { thunkGetCheckIns } from "../../../Store/checkins";

function useGetSession(id) {
    const [data, setData] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const { handleAlerts } = useApp();
    const { sessionNotFound } = sessionsAlerts;
    const dispatch = useDispatch();

    useEffect(() => {
        const getSession = () => {
            try {
                dispatch(thunkGetSingleSession(id));
                dispatch(thunkGetCheckIns(id))
                setData(true);
                setLoading(false)
            } catch(error) {
                handleAlerts(sessionNotFound);
                setData(false)
            }
        }
        getSession();

    }, [dispatch, id])

    return [data, loading]
}

export default useGetSession;
