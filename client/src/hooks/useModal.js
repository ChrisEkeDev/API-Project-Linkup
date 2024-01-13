import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const onCloseModal = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return { isModalOpen, onOpenModal, onCloseModal };
};

export default useModal;
