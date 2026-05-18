export type Priority = 'baja' | 'media' | 'alta';

export type ColumnId = 'alberto' | 'aaron' | 'general' | 'completadas';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
  columnId: ColumnId;
  createdAt: string;
}

export interface Column {
  id: ColumnId;
  title: string;
  icon: string;
}
