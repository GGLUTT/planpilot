export interface User {
  userId: string;
  username: string;
  firstName: string;
  lastName?: string;
  photoUrl?: string;
}

export interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  deadline?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'canceled';
  priority: 'low' | 'medium' | 'high';
  tasks: Task[];
  createdAt: string;
}

export interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
}

export interface GoalsContextType {
  goals: Goal[];
  isLoading: boolean;
  error: string | null;
  fetchGoals: (userId: string) => Promise<void>;
  addGoal: (goalData: Omit<Goal, '_id' | 'createdAt' | 'tasks'> & { tasks?: Omit<Task, '_id'>[] }) => Promise<void>;
  updateGoal: (goalId: string, goalData: Partial<Omit<Goal, '_id' | 'userId' | 'createdAt'>>) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
  addTask: (goalId: string, title: string) => Promise<void>;
  updateTask: (goalId: string, taskId: string, taskData: Partial<Omit<Task, '_id'>>) => Promise<void>;
  deleteTask: (goalId: string, taskId: string) => Promise<void>;
} 