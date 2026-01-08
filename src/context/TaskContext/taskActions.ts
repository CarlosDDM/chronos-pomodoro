import type { TaskModel } from '../../models/TaskModel';
import type { TaskStateModel } from '../../models/TaskStateModel';

export enum TaskactionTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_TASK = 'RESET_TASK',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK',
  CHANGE_SETTINGS = 'CHANGE_SETTINGS',
}

type TaskActionModelWithPayload =
  | {
      type: TaskactionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: TaskactionTypes.COUNT_DOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: TaskactionTypes.CHANGE_SETTINGS;
      payload: TaskStateModel['config'];
    };
type TaskActionModelWithoutPayload =
  | {
      type: TaskactionTypes.RESET_TASK;
    }
  | {
      type: TaskactionTypes.INTERRUPT_TASK;
    }
  | {
      type: TaskactionTypes.COMPLETE_TASK;
    };

export type TaskActionModel =
  | TaskActionModelWithPayload
  | TaskActionModelWithoutPayload;
