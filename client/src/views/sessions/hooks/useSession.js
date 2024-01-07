import { useApp } from "../../../context/AppContext";
import { thunkDeleteSession } from "../../../store/sessions";
import { thunkAddCheckIn, thunkDeleteCheckIn } from "../../../store/checkins"

const useSession = (session) => {
    const { dispatch, navigate, handleAlerts } = useApp();

    const deleteSession = async () => {
        try {
            const res = await dispatch(thunkDeleteSession(session));
            handleAlerts(res)
            if ( res.status >= 400) {
                throw new Error();
            } else {
                navigate("/sessions")
            }
        } catch(e) {
            console.log(e)
        }

    }

    const checkIn = async () => {
        try {
            const res = await dispatch(thunkAddCheckIn(session.id));
            handleAlerts(res)
            if ( res.status >= 400) {
                throw new Error();
            }
        } catch (e) {
            console.log(e)
        }
    }

    const checkOut = async () => {
        try {
            const res = await dispatch(thunkDeleteCheckIn(session.id));
            handleAlerts(res)
            if ( res.status >= 400) {
                throw new Error();
            }
        } catch (e) {
            console.log(e)
        }
    }

    return {
        deleteSession,
        checkIn,
        checkOut
    }
}

export default useSession;
