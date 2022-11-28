import {useState} from 'react';

export const useModal = <ParamType>(defaultParam?: ParamType) => {
  const [param, setParam] = useState(defaultParam);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (newParam?: ParamType) => {
    newParam && setParam(newParam);
    setIsOpen(true);
  };

  const closeModal = () => {
    param && setParam(defaultParam);
    setIsOpen(false);
  };

  return {
    isOpen,
    param,
    closeModal,
    openModal,
  };
};
