// import React, { useState, useEffect, useRef } from 'react'
// import { useApp } from '../../../context/AppContext'
// import { thunkUpdateTeamChat, thunkDeleteTeamChat, thunkGetTeamFeed, thunkGetMyLikes, thunkAddLike, thunkRemoveLike } from "../../../store/chats";
// import { useSelector } from 'react-redux';

// function useTeamChat(props) {
//     const teamId = useSelector(state => state.teams.singleTeam).id;
//     const {chat, socket, room} = props;
//     const { dispatch } = useApp();
//     const [content, setContent] = useState(chat.content);
//     const [editing, setEditing] = useState(false);
//     const ref = useRef(null);

//     const handleClickOutside = (e) => {
//         if (ref.current && !ref.current.contains(e.target)) {
//             setEditing(false)
//         }
//     }

//     const handleInput = async (x) => {
//         setContent(x.target.value)
//     }

//     const updateTeamChat = async () => {
//         try {
//             const response = await dispatch(thunkUpdateTeamChat(chat.id, content));
//             socket.emit('update_message', room);
//             setEditing(false)
//             if (response.status >= 400) {
//                 throw new Error(response.error)
//             }
//         } catch(error) {
//             console.log(error)
//         }
//     }

//     const deleteTeamChat = async () => {
//         try {
//             const response = await dispatch(thunkDeleteTeamChat(chat.id));
//             socket.emit('delete_message', room);
//             setEditing(false)
//             if (response.status >= 400) {
//                 throw new Error(response.error)
//             }
//         } catch(error) {
//             console.log(error)
//         }
//     }

//     const addLike = async () => {
//         const data = { entityId: chat.id, entityType: 'team-chat'}
//         try {
//             const response = await dispatch(thunkAddLike(data));
//             await dispatch(thunkGetMyLikes())
//             await dispatch(thunkGetTeamFeed(teamId))
//             if (response.status >= 400) {
//                 throw new Error(response.error)
//             }
//         } catch(error) {
//             console.log(error)
//         }
//     }

//     const removeLike = async () => {
//         const data = { entityId: chat.id }
//         try {
//             const response = await dispatch(thunkRemoveLike(data));
//             await dispatch(thunkGetMyLikes())
//             await dispatch(thunkGetTeamFeed(teamId))
//             if (response.status >= 400) {
//                 throw new Error(response.error)
//             }
//         } catch(error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         document.addEventListener('click', handleClickOutside, true)
//         return () => {
//             document.removeEventListener('click', handleClickOutside, true)
//         }
//     }, [])

//     return { ref, content, handleInput, updateTeamChat, deleteTeamChat, editing, setEditing, addLike, removeLike  }
// }

// export default useTeamChat
