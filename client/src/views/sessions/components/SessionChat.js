
import Modal from '../../../components/shared/modal';
import useModal from '../../../hooks/useModal';
import useSessionChat from "../hooks/useSessionChat"
import DeleteSessionChatModal from './DeleteSessionChatModal';
import ChatMessage from '../../../components/shared/chat/ChatMessage';

function SessionChat(props) {
    const { chat, room, socket } = props;
    const { isModalOpen, onOpenModal, onCloseModal } = useModal();

    const {
        ref,
        content,
        handleInput,
        editing,
        setEditing,
        onUpdateSessionChat,
        onDeleteSessionChat,
        onAddSessionChatLike,
        onRemoveSessionChatLike
    } = useSessionChat({chat, socket, room})

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
                updateChat: onUpdateSessionChat,
                deleteChat: onOpenModal,
                addLike: onAddSessionChatLike,
                removeLike: onRemoveSessionChatLike
            }}
        />
        <Modal
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
        >
            <DeleteSessionChatModal
                chat={chat}
                deleteChat={onDeleteSessionChat}
                close={onCloseModal}
            />
        </Modal>
        </>
    )
}

export default SessionChat
