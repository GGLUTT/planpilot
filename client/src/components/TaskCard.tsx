import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Task } from '../types';
import { Flex, Badge, IconButton } from '../styles/StyledComponents';

interface TaskCardProps {
  task: Task;
  goalId: string;
  onUpdate: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, goalId, onUpdate, onDelete, onEdit }) => {
  const [isChecked, setIsChecked] = useState(task.completed);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onUpdate(task._id, !isChecked);
  };

  return (
    <TaskContainer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
      whileHover={{ scale: 1.01 }}
      completed={isChecked}
    >
      <Checkbox checked={isChecked} onClick={handleToggle}>
        {isChecked && <CheckIcon>✓</CheckIcon>}
      </Checkbox>
      <TaskContent completed={isChecked}>
        <TaskTitle completed={isChecked}>{task.title}</TaskTitle>
      </TaskContent>
      <TaskActions>
        <IconButton onClick={() => onEdit(task._id)}>
          <span>✏️</span>
        </IconButton>
        <IconButton onClick={() => onDelete(task._id)}>
          <span>🗑️</span>
        </IconButton>
      </TaskActions>
    </TaskContainer>
  );
};

const TaskContainer = styled(motion.div)<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  background-color: ${({ completed }) => completed ? 'var(--secondary-bg-color)' : 'var(--bg-color)'};
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-sm);
  transition: background-color 0.2s ease;
`;

const Checkbox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ checked }) => checked ? 'var(--success-color)' : 'var(--hint-color)'};
  background-color: ${({ checked }) => checked ? 'var(--success-color)' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: var(--spacing-md);
  transition: all 0.2s ease;
`;

const CheckIcon = styled.span`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const TaskContent = styled.div<{ completed: boolean }>`
  flex: 1;
  opacity: ${({ completed }) => completed ? 0.7 : 1};
`;

const TaskTitle = styled.h3<{ completed: boolean }>`
  font-size: var(--font-size-md);
  font-weight: 500;
  text-decoration: ${({ completed }) => completed ? 'line-through' : 'none'};
  color: ${({ completed }) => completed ? 'var(--hint-color)' : 'var(--text-color)'};
  transition: all 0.2s ease;
`;

const TaskActions = styled.div`
  display: flex;
  gap: var(--spacing-xs);
`;

export default TaskCard; 