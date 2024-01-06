import { AnimatePresence, motion } from "framer-motion";
import IconButton from "../button/IconButton";
import { PiXBold } from 'react-icons/pi'
import { base_variants, base_animations } from "../../../constants/animations";
import './styles.scss';

const Modal = (props) => {
    const {
        isModalOpen,
        onCloseModal,
        children
    } = props;

    return (
        <AnimatePresence>
            {
                isModalOpen ?
                <motion.div variants={base_variants} {...base_animations} className="modal-overlay">
                    <div className="modal">
                        <IconButton
                            styles='modal_close'
                            icon={PiXBold}
                            action={onCloseModal}
                        />
                        {children}
                    </div>
                </motion.div> :
                null
            }
        </AnimatePresence>

    )
}


export default Modal;
