import useTeamChat from '../hooks/useTeamChat'
import Modal from '../../../components/shared/modal';
import useModal from '../../../hooks/useModal';
import DeleteTeamChatModal from './DeleteTeamChatModal';
import ChatMessage from '../../../components/shared/chat/ChatMessage';

function TeamChat(props) {
    const { chat, room, socket } = props;
    const { isModalOpen, onOpenModal, onCloseModal } = useModal();

    const {
        ref,
        content,
        handleInput,
        editing,
        setEditing,
        onUpdateTeamChat,
        onDeleteTeamChat,
        onAddTeamChatLike,
        onRemoveTeamChatLike
    } = useTeamChat({chat, socket, room})

    return (
        <>
            <ChatMessage
                chatData={{
                    chat,
                    feed: true,
                    ref,
                    content,
                    handleInput,
                    editing,
                    setEditing,
                    updateChat: onUpdateTeamChat,
                    deleteChat: onOpenModal,
                    addLike: onAddTeamChatLike,
                    removeLike: onRemoveTeamChatLike
                }}
            />
            <Modal
                isModalOpen={isModalOpen}
                onCloseModal={onCloseModal}
            >
                <DeleteTeamChatModal
                    chat={chat}
                    deleteChat={onDeleteTeamChat}
                    close={onCloseModal}
                />
            </Modal>
        </>
    )
}

export default TeamChat
