import { TaskContextProvider } from './context/TaskContext/TaskContextProvider';
import { ToastfyMessagesContainer } from './components/ToastfyMessagesContainer';
import { ModalAdapterProvider } from './context/ModalContext/ModalAdapterProvider';
import { MainRouter } from './router/MainRouter';
import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <>
      <ModalAdapterProvider>
        <TaskContextProvider>
          <ToastfyMessagesContainer>
            <MainRouter />
          </ToastfyMessagesContainer>
        </TaskContextProvider>
      </ModalAdapterProvider>
    </>
  );
}
