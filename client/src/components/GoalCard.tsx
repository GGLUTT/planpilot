import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Goal } from '../types';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter,
  Flex,
  Badge,
  Button,
  SmallText
} from '../styles/StyledComponents';

interface GoalCardProps {
  goal: Goal;
  onClick: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'primary';
      case 'canceled':
        return 'danger';
      default:
        return 'warning';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No deadline';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const completedTasks = goal.tasks.filter(task => task.completed).length;
  const progress = goal.tasks.length > 0 
    ? Math.round((completedTasks / goal.tasks.length) * 100) 
    : 0;

  return (
    <StyledCard
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <StyledCardHeader>
        <Flex justify="space-between" align="center">
          <CardTitle>{goal.title}</CardTitle>
          <Badge variant={getStatusColor(goal.status)}>{goal.status}</Badge>
        </Flex>
      </StyledCardHeader>
      
      <StyledCardContent>
        {goal.description && (
          <Description>{goal.description}</Description>
        )}
        
        <TaskProgress>
          <Flex justify="space-between" align="center">
            <SmallText>Progress: {completedTasks} / {goal.tasks.length} tasks</SmallText>
            <SmallText>{progress}%</SmallText>
          </Flex>
          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>
        </TaskProgress>
      </StyledCardContent>
      
      <StyledCardFooter>
        <Flex justify="space-between" align="center" style={{ width: '100%' }}>
          <BadgeContainer>
            <Badge variant={getPriorityColor(goal.priority)}>{goal.priority}</Badge>
            <DeadlineBadge>{formatDate(goal.deadline)}</DeadlineBadge>
          </BadgeContainer>
          <Button variant="outline" size="sm">View Details</Button>
        </Flex>
      </StyledCardFooter>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  cursor: pointer;
  margin-bottom: var(--spacing-md);
`;

const StyledCardHeader = styled(CardHeader)`
  background-color: var(--bg-color);
`;

const StyledCardContent = styled(CardContent)`
  padding-bottom: var(--spacing-sm);
`;

const StyledCardFooter = styled(CardFooter)`
  background-color: var(--secondary-bg-color);
  padding: var(--spacing-sm) var(--spacing-md);
`;

const CardTitle = styled.h3`
  font-size: var(--font-size-md);
  font-weight: 600;
  margin: 0;
`;

const Description = styled.p`
  font-size: var(--font-size-sm);
  color: var(--text-color);
  margin-bottom: var(--spacing-md);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TaskProgress = styled.div`
  margin-top: var(--spacing-sm);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--secondary-bg-color);
  border-radius: 4px;
  margin-top: var(--spacing-xs);
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background-color: var(--primary-color);
  width: ${({ progress }) => `${progress}%`};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: var(--spacing-xs);
`;

const DeadlineBadge = styled.span`
  font-size: var(--font-size-xs);
  color: var(--hint-color);
  background-color: var(--bg-color);
  padding: 2px 8px;
  border-radius: 12px;
`;

export default GoalCard; 