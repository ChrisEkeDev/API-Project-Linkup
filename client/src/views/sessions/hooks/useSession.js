import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useApp } from "../../../context/AppContext";
import { thunkGetSingleSession } from "../../../store/sessions";
import { useParams } from "react-router-dom";
import { thunkGetCheckIns } from "../../../store/checkins";

function useSession() {
    const { id } = useParams();
    const { dispatch } = useApp();
    const session = useSelector(state => state.sessions.singleSession)
    const checkInData = useSelector(state => state.checkIns.sessionCheckIns)
    const checkIns = Object.values(checkInData);

    useEffect(() => {
        const getSession = () => {
            try {
                dispatch(thunkGetSingleSession(id));
                dispatch(thunkGetCheckIns(id))
            } catch(e) {
                console.log(e)
            }
        }
        getSession();

    }, [dispatch, id])

    return { session, checkIns }
}

export default useSession;
