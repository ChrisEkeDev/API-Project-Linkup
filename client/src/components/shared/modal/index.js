import { TbX } from "react-icons/tb";
import IconButton from "../button/IconButton";
import './styles.scss';

const Modal = (props) => {
    const {
        isModalOpen,
        onCloseModal,
        children
    } = props;

    return (
        <>
        {
            isModalOpen ?
            <div className="modal-overlay">
                <div className="modal">
                    <IconButton
                        styles='modal_close'
                        icon={TbX}
                        action={onCloseModal}
                    />
                    {children}
                </div>
            </div> :
            null
        }
        </>

    )
}


export default Modal;
