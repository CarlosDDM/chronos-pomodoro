import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './style.module.css';
import { useRef } from 'react';
import { useTaskContext } from '../../context/TaskContext/useTaskContext';
import { toastfyAdapter } from '../../adapters/toastfyAdapter';
import { TaskactionTypes } from '../../context/TaskContext/taskActions';

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toastfyAdapter.dismiss();
    const formErros = [];
    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErros.push('Digite apenas números para todos os campos.');
    }

    if (workTime < 1 || workTime > 99) {
      formErros.push('Digite valores entre 1 e 99 para foco.');
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErros.push('Digite valores entre 1 e 30 para descanso curto.');
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErros.push('Digite valores entre 1 e 60 para descanso longo.');
    }

    if (formErros.length > 0) {
      formErros.forEach(error => {
        toastfyAdapter.error(error);
      });
      return;
    }

    dispatch({
      type: TaskactionTypes.CHANGE_SETTINGS,
      payload: { workTime, shortBreakTime, longBreakTime },
    });

    toastfyAdapter.success('Configurações salvas');
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p className={styles.settingsText}>
          Modifique as configurações para tempo de foco, descanso curto e
          descanso longo.
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettings} action='' className={styles.form}>
          <div className={styles.formRow}>
            <DefaultInput
              id='wrokTime'
              labelText='Foco'
              ref={workTimeInput}
              defaultValue={state.config.workTime}
              type='number'
              min='1'
              max='99'
              maxLength={2}
            />
          </div>
          <div className={styles.formRow}>
            <DefaultInput
              id='shortBreakTime'
              labelText='Descanso curto'
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
              type='number'
              min='1'
              max='30'
              maxLength={2}
            />
          </div>
          <div className={styles.formRow}>
            <DefaultInput
              id='longBreakTime'
              labelText='Descanso longo'
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
              type='number'
              min='1'
              max='60'
              maxLength={2}
            />
          </div>

          <div className={styles.form}>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Salvar configurações'
              title='Salvar configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
