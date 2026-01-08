import { useContext } from 'react';
import { ModalContext } from './ModalAdapterContext';

export function useModalAdapterContext() {
  return useContext(ModalContext);
}
