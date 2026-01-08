import { createContext } from 'react';
type ModalAdapterContextProps = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const initialModalContextValue: ModalAdapterContextProps = {
  open: false,
  onClose: () => {},
  onOpen: () => {},
};

export const ModalContext = createContext<ModalAdapterContextProps>(
  initialModalContextValue,
);
