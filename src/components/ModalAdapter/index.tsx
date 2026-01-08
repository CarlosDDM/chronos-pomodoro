import { Modal } from '@mui/material';
import styles from './styles.module.css';

type ModalAdapterProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Modal>;

export const ModalAdapter = ({ children, ...props }: ModalAdapterProps) => {
  return (
    <div className={styles.modalContainer}>
      <Modal {...props}>
        <div className={styles.modalContent}>{children}</div>
      </Modal>
    </div>
  );
};
