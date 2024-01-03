import { TbX } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import IconButton from "../button/IconButton";
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
                            icon={TbX}
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
