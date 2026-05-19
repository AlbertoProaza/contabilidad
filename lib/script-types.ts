export type ScriptStatus = 'pendiente' | 'grabado' | 'editando';

export interface Script {
  id: string;
  title: string;
  content: string;
  status: ScriptStatus;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
