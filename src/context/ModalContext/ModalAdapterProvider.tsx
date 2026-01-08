import { useState } from 'react';
import { ModalContext } from './ModalAdapterContext';

type ModalAdapterProviderProps = {
  children: React.ReactNode;
};
export const ModalAdapterProvider = ({
  children,
}: ModalAdapterProviderProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ModalContext.Provider
      value={{ open, onClose: handleClose, onOpen: handleOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};
