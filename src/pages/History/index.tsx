import styles from './style.module.css';
import { CheckIcon, TrashIcon, X } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../context/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';
import { TaskactionTypes } from '../../context/TaskContext/taskActions';
import { useModalAdapterContext } from '../../context/ModalContext/useModalAdapterContext';
import { ModalAdapter } from '../../components/ModalAdapter';
import { toastfyAdapter } from '../../adapters/toastfyAdapter';

export function History() {
  const { state, dispatch } = useTaskContext();
  const { open, onClose, onOpen } = useModalAdapterContext();
  const hasTasks = state.tasks.length > 0;
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        order: 'desc',
      };
    },
  );
  useEffect(() => {
    setSortTasksOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        field: prevState.field,
        direction: prevState.direction,
      }),
    }));
  }, [state.tasks]);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTasksOptions({
      tasks: sortTasks({
        tasks: sortTasksOptions.tasks,
        direction: newDirection,
        field,
      }),
      field,
      direction: newDirection,
    });
  }

  function handleTrashButton() {
    toastfyAdapter.dismiss();
    onOpen();
  }

  function handleResetHistory() {
    toastfyAdapter.dismiss();
    dispatch({ type: TaskactionTypes.RESET_TASK });
    toastfyAdapter.info('Historico Apagado.');
    onClose();
  }
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={handleTrashButton}
              />
            </span>
          )}
        </Heading>
      </Container>
      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: 'name' })}
                  >
                    Tarefa ↕
                  </th>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: 'duration' })}
                  >
                    Duração ↕
                  </th>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                  >
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map(task => {
                  const taskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso Curto',
                    longBreakTime: 'Descanso Longo',
                  };
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration} min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && (
          <p className={styles.noTasks}>Ainda não exitem tarefas criadas.</p>
        )}
      </Container>
      {open && (
        <ModalAdapter open={open} onClose={onClose}>
          <>
            <div className={styles.modalText}>
              <h3>Tem Certeza?</h3>
              <p>Tem certeza que deseja apagar todo o histórico de tarefas?</p>
            </div>
            <div className={styles.modalContainerButtons}>
              <DefaultButton
                key='ACCEPT'
                icon={<CheckIcon />}
                aria-label='Sim apagar'
                title='Sim apagar o histórico'
                onClick={handleResetHistory}
              />
              <DefaultButton
                color='red'
                aria-label='Não apagar'
                title='Não apagar o histórico'
                key='CANCEL'
                icon={<X />}
                onClick={onClose}
              />
            </div>
          </>
        </ModalAdapter>
      )}
    </MainTemplate>
  );
}
