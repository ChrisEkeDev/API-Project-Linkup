import { useState, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { useDispatch } from "react-redux";
import { thunkGetCommentsBySession } from "../../../Store/comments";


function useGetComments(id) {
    const [data, setData] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const { handleAlerts } = useApp();
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        const getComments = () => {
            try {
                dispatch(thunkGetCommentsBySession(id))
                setData(true)
            } catch(error) {
                setData(false)
            } finally {
                setLoading(false)
            }
        }
        getComments();
    }, [dispatch, id])

    return [ data, loading ]
}

export default useGetComments;
