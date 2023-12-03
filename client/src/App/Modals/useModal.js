import React, { useState } from 'react'

function useModal() {
    const [modalVisible, setModalVisible ] = useState(false)

    const openModal = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return [modalVisible, openModal, closeModal ]
}

export default useModal;
