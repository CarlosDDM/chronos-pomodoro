import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../context/TaskContext/useTaskContext';
import { TaskactionTypes } from '../../context/TaskContext/taskActions';
import { Tips } from '../Tips';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { getNextCycle } from '../../utils/getNextCycle';
import { toastfyAdapter } from '../../adapters/toastfyAdapter';
import styles from './style.module.css';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name;

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toastfyAdapter.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      toastfyAdapter.warn('Por favor, insira um nome para a tarefa.');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskactionTypes.START_TASK, payload: newTask });

    toastfyAdapter.success(`Tarefa "${taskName}" iniciada!`);
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    dispatch({ type: TaskactionTypes.INTERRUPT_TASK });
    toastfyAdapter.dismiss();
    if (taskNameInput.current) {
      toastfyAdapter.error(
        `Tarefa "${taskNameInput.current.value}" interrompida!`,
      );
    }
  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} action=''>
      <div className={styles.formRow}>
        <DefaultInput
          id='task'
          type='text'
          labelText='task'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>
      <div className={styles.formRow}>
        <Tips />
      </div>
      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}
      <div className={styles.formRow}>
        {!state.activeTask && (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
          />
        )}{' '}
        {!!state.activeTask && (
          <DefaultButton
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
            type='button'
            icon={<StopCircleIcon />}
            color='red'
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
