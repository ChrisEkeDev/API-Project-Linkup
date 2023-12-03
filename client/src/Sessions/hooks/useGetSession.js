import { useEffect, useState } from "react";
import { useApp } from "../../App/Context/AppContext";
import { thunkGetSingleSession } from "../../Store/sessions";
import { sessionsAlerts } from "../../Shared/constants/alertData";
import { useDispatch } from "react-redux";
import { thunkGetCheckIns } from "../../Store/checkins";

function useGetSession(id) {
    const [data, setData] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const { handleAlerts } = useApp();
    const { sessionNotFound } = sessionsAlerts;
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        const getSession = () => {
            try {
                dispatch(thunkGetSingleSession(id));
                dispatch(thunkGetCheckIns(id))
                setData(true)
            } catch(error) {
                handleAlerts(sessionNotFound);
                setData(false)
            } finally {
                setLoading(false)
            }
        }
        getSession();

    }, [dispatch])

    return [data, loading]
}

export default useGetSession;
