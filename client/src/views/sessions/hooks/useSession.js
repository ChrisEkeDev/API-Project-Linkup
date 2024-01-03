import { useApp } from "../../../context/AppContext";
import { thunkDeleteSession } from "../../../store/sessions";
import { thunkAddCheckIn, thunkDeleteCheckIn } from "../../../store/checkins"

const useSession = (session) => {
    const { dispatch, navigate } = useApp();

    const deleteSession = async () => {
        try {
            const res = await dispatch(thunkDeleteSession(session));
            if (res.status === 200) {
                navigate("/sessions")
            } else {
                throw new Error();
            }
        } catch(e) {
            console.log(e)
        }

    }

    const checkIn = async () => {
        try {
            const res = await dispatch(thunkAddCheckIn(session.id));
            if (res.status === 201 || res.status === 200) {
                console.log(res)
            } else {
                throw new Error();
            }
        } catch (e) {
            console.log(e)
        }
    }

    const checkOut = async () => {
        try {
            const res = await dispatch(thunkDeleteCheckIn(session.id));
            if (res.status === 200) {
                console.log(res)
            } else {
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
