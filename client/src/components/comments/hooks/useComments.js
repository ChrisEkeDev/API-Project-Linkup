import { useEffect } from "react";
import { sortComments } from "../helpers/sortComments";
import { useApp } from "../../../context/AppContext";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetCommentsBySession } from "../../../store/comments";


const useComments = () => {
    const { id } = useParams();
    const commentData = useSelector(state => state.comments.comments);
    const { dispatch } = useApp();
    const comments = sortComments(Object.values(commentData))

    useEffect(() => {
        const getComments = async () => {
            try {
                await dispatch(thunkGetCommentsBySession(id))
            } catch(e) {
                console.log(e)
            }
        }
        getComments();
    }, [dispatch, id])

    return { comments }
}

export default useComments;
