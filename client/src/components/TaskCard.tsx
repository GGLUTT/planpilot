import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  Flex, 
  SmallText 
} from '../styles/StyledComponents';

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: string;
  };
  onToggle: (completed: boolean) => void;
  highlight?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, highlight = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleExpand = () => {
    if (task.description) {
      setIsExpanded(prev => !prev);
    }
  };

  return (
    <AnimatePresence>
      <StyledCard
        as={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: highlight ? [1, 1.05, 1] : 1,
          backgroundColor: highlight ? ['var(--card-bg-color)', 'var(--success-color)', 'var(--card-bg-color)'] : 'var(--card-bg-color)'
        }}
        transition={{ 
          duration: 0.2,
          scale: highlight ? { duration: 0.5 } : undefined,
          backgroundColor: highlight ? { duration: 0.5 } : undefined
        }}
        completed={task.completed}
        highlight={highlight}
      >
        <Flex justify="space-between" align="flex-start">
          <TaskContentWrapper onClick={toggleExpand}>
            <Flex align="center">
              <Checkbox
                type="checkbox"
                checked={task.completed}
                onChange={(e) => onToggle(e.target.checked)}
                onClick={(e) => e.stopPropagation()}
              />
              <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
            </Flex>
            
            <AnimatePresence>
              {isExpanded && task.description && (
                <TaskDescription
                  as={motion.div}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {task.description}
                </TaskDescription>
              )}
            </AnimatePresence>
          </TaskContentWrapper>
          
          {task.dueDate && (
            <DueDate>
              {formatDate(task.dueDate)}
            </DueDate>
          )}
        </Flex>
        
        {task.description && (
          <ExpandIndicator isExpanded={isExpanded} onClick={toggleExpand}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points={isExpanded ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
            </svg>
          </ExpandIndicator>
        )}
      </StyledCard>
    </AnimatePresence>
  );
};

const StyledCard = styled(Card)<{ completed: boolean, highlight: boolean }>`
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  position: relative;
  border-left: 3px solid ${({ completed }) => completed ? 'var(--success-color)' : 'var(--primary-color)'};
  opacity: ${({ completed }) => completed ? 0.8 : 1};
  background-color: var(--card-bg-color);
  transition: background-color var(--transition-speed) ease, 
              border-color var(--transition-speed) ease,
              opacity var(--transition-speed) ease;
`;

const TaskContentWrapper = styled.div`
  flex: 1;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: var(--spacing-sm);
  cursor: pointer;
  accent-color: var(--success-color);

  &:hover {
    transform: scale(1.1);
  }
`;

const TaskTitle = styled.span<{ completed: boolean }>`
  color: var(--text-color);
  font-weight: 500;
  text-decoration: ${({ completed }) => completed ? 'line-through' : 'none'};
  flex: 1;
  transition: text-decoration var(--transition-speed) ease;
`;

const TaskDescription = styled(SmallText)`
  margin-top: var(--spacing-sm);
  margin-left: calc(18px + var(--spacing-sm));
  color: var(--hint-color);
  overflow: hidden;
`;

const DueDate = styled.span`
  background-color: var(--secondary-bg-color);
  border-radius: 12px;
  padding: 2px 8px;
  font-size: var(--font-size-xs);
  color: var(--hint-color);
  font-weight: 500;
  white-space: nowrap;
`;

const ExpandIndicator = styled.div<{ isExpanded: boolean }>`
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--hint-color);
  cursor: pointer;
  width: 24px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    color: var(--text-color);
  }
  
  svg {
    transition: transform 0.2s ease;
  }
`;

export default TaskCard; 