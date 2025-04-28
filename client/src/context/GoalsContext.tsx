import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Goal, GoalsContextType, Task } from '../types';
import { getGoals, createGoal, updateGoal, deleteGoal, addTask, updateTask, deleteTask } from '../api/api';

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async (userId: string) => {
    setIsLoading(true);
    try {
      const goalsData = await getGoals(userId);
      setGoals(goalsData);
      setError(null);
    } catch (error) {
      console.error('Error fetching goals:', error);
      setError('Failed to fetch goals');
    } finally {
      setIsLoading(false);
    }
  };

  const addGoal = async (goalData: Omit<Goal, '_id' | 'createdAt' | 'tasks'> & { tasks?: Omit<Task, '_id'>[] }) => {
    setIsLoading(true);
    try {
      const newGoal = await createGoal(goalData);
      setGoals((prevGoals) => [...prevGoals, newGoal]);
      setError(null);
    } catch (error) {
      console.error('Error adding goal:', error);
      setError('Failed to add goal');
    } finally {
      setIsLoading(false);
    }
  };

  const updateGoalById = async (goalId: string, goalData: Partial<Omit<Goal, '_id' | 'userId' | 'createdAt'>>) => {
    setIsLoading(true);
    try {
      const updatedGoal = await updateGoal(goalId, goalData);
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal._id === goalId ? updatedGoal : goal))
      );
      setError(null);
    } catch (error) {
      console.error('Error updating goal:', error);
      setError('Failed to update goal');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGoalById = async (goalId: string) => {
    setIsLoading(true);
    try {
      await deleteGoal(goalId);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== goalId));
      setError(null);
    } catch (error) {
      console.error('Error deleting goal:', error);
      setError('Failed to delete goal');
    } finally {
      setIsLoading(false);
    }
  };

  const addTaskToGoal = async (goalId: string, title: string) => {
    setIsLoading(true);
    try {
      const updatedGoal = await addTask(goalId, title);
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal._id === goalId ? updatedGoal : goal))
      );
      setError(null);
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task');
    } finally {
      setIsLoading(false);
    }
  };

  const updateTaskInGoal = async (goalId: string, taskId: string, taskData: Partial<Omit<Task, '_id'>>) => {
    setIsLoading(true);
    try {
      const updatedGoal = await updateTask(goalId, taskId, taskData);
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal._id === goalId ? updatedGoal : goal))
      );
      setError(null);
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTaskFromGoal = async (goalId: string, taskId: string) => {
    setIsLoading(true);
    try {
      const updatedGoal = await deleteTask(goalId, taskId);
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal._id === goalId ? updatedGoal : goal))
      );
      setError(null);
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoalsContext.Provider
      value={{
        goals,
        isLoading,
        error,
        fetchGoals,
        addGoal,
        updateGoal: updateGoalById,
        deleteGoal: deleteGoalById,
        addTask: addTaskToGoal,
        updateTask: updateTaskInGoal,
        deleteTask: deleteTaskFromGoal,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = (): GoalsContextType => {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
};

export default GoalsContext; 