import type { TaskStateModel } from '../models/TaskStateModel';

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL('./timerWorker.js', import.meta.url));
  }
  public static getInstance(): TimerWorkerManager {
    if (!instance) {
      instance = new TimerWorkerManager();
    }
    return instance;
  }

  public postMessage(message: TaskStateModel) {
    this.worker.postMessage(message);
  }

  public onmessage(cb: (e: MessageEvent) => void) {
    this.worker.onmessage = cb;
  }

  public terminate() {
    this.worker.terminate();
    instance = null;
  }
}
