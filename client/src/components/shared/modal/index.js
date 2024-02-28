import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from "framer-motion";
import IconButton from "../button/IconButton";
import { useApp } from "../../../context/AppContext";
import { TbX } from 'react-icons/tb'
import { base_variants, base_animations } from "../../../constants/animations";
import './styles.scss';

const Modal = (props) => {
    const { theme } = useApp();
    const root = document.getElementById('app_root');
    const {
        isModalOpen,
        onCloseModal,
        children
    } = props;

    return (
        <AnimatePresence>
            {
                isModalOpen &&
                    createPortal(
                        <motion.div variants={base_variants} {...base_animations} className="modal-overlay">
                            <div className={`modal modal-${theme}`}>
                                <IconButton
                                    styles='modal_close'
                                    icon={TbX}
                                    action={onCloseModal}
                                />
                                {children}
                            </div>
                        </motion.div>,
                        document.body
                    )
            }
        </AnimatePresence>
    )
}


export default Modal;
