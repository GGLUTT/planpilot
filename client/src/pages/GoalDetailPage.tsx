import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useGoals } from '../context/GoalsContext';
import { useTelegram } from '../context/TelegramContext';
import { 
  Container, 
  MainContent, 
  Title, 
  Subtitle, 
  Text,
  Button,
  Badge,
  Card,
  LoadingContainer,
  Loader,
  Flex
} from '../styles/StyledComponents';
import TaskCard from '../components/TaskCard';
import useTelegramBackButton from '../hooks/useTelegramBackButton';

const GoalDetailPage: React.FC = () => {
  const { goalId } = useParams<{ goalId: string }>();
  const { goals, updateGoal, isLoading } = useGoals();
  const navigate = useNavigate();
  const { showMainButton, hideMainButton, showAlert, setMainButtonParams } = useTelegram();
  const [goal, setGoal] = useState<any>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [lastTaskCompleted, setLastTaskCompleted] = useState<string | null>(null);
  
  // Handle Telegram back button
  useTelegramBackButton(() => navigate('/'));

  useEffect(() => {
    if (goals.length > 0 && goalId) {
      const foundGoal = goals.find(g => g._id === goalId);
      if (foundGoal) {
        setGoal(foundGoal);
      }
    }
  }, [goals, goalId]);

  // Telegram MainButton handling
  useEffect(() => {
    if (goal) {
      if (goal.status === 'in-progress') {
        showMainButton('Mark as Completed', handleCompleteGoal);
      } else if (goal.status === 'pending') {
        showMainButton('Start Goal', handleStartGoal);
      } else {
        hideMainButton();
      }
    }

    return () => {
      hideMainButton();
    };
  }, [goal]);

  // Timer effect
  useEffect(() => {
    let interval: number | null = null;
    
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimerDuration(prev => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive]);

  // Animation for task completion
  useEffect(() => {
    if (lastTaskCompleted) {
      const timeout = setTimeout(() => {
        setLastTaskCompleted(null);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [lastTaskCompleted]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartGoal = async () => {
    if (goal) {
      const updatedGoal = {
        ...goal,
        status: 'in-progress',
        startDate: new Date().toISOString()
      };
      
      await updateGoal(goal._id, {
        status: 'in-progress',
        startDate: new Date().toISOString()
      });
      setGoal(updatedGoal);
      setIsTimerActive(true);
      setMainButtonParams({ text: 'Mark as Completed' });
    }
  };

  const handleCompleteGoal = async () => {
    if (goal) {
      const updatedGoal = {
        ...goal,
        status: 'completed',
        completionDate: new Date().toISOString()
      };
      
      await updateGoal(goal._id, {
        status: 'completed',
        completionDate: new Date().toISOString()
      });
      setGoal(updatedGoal);
      setIsTimerActive(false);
      hideMainButton();
      showAlert('Congratulations! Goal marked as completed.');
    }
  };

  const handleToggleTimer = () => {
    setIsTimerActive(prev => !prev);
  };

  const handleTaskToggle = async (taskId: string, completed: boolean) => {
    if (goal) {
      const updatedTasks = goal.tasks.map((task: any) => 
        task._id === taskId ? { ...task, completed } : task
      );
      
      const updatedGoal = { ...goal, tasks: updatedTasks };
      await updateGoal(goal._id, { tasks: updatedTasks });
      setGoal(updatedGoal);
      
      if (completed) {
        setLastTaskCompleted(taskId);
      }
      
      // Check if all tasks are completed
      const allTasksCompleted = updatedTasks.every((task: any) => task.completed);
      if (allTasksCompleted && goal.status === 'in-progress') {
        showAlert('All tasks completed! You can mark the goal as completed.');
      }
    }
  };

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
    if (!dateString) return 'Not set';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <Loader />
          <Text>Loading goal details...</Text>
        </LoadingContainer>
      </Container>
    );
  }

  if (!goal) {
    return (
      <Container>
        <Text>Goal not found. <Button onClick={() => navigate('/')}>Go Back</Button></Text>
      </Container>
    );
  }

  const completedTasks = goal.tasks.filter((task: any) => task.completed).length;
  const progress = goal.tasks.length > 0 
    ? Math.round((completedTasks / goal.tasks.length) * 100) 
    : 0;

  return (
    <Container>
      <MainContent>
        <Header>
          <BackButton onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </BackButton>
          <Title>{goal.title}</Title>
        </Header>

        <StyledContent
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <InfoCard>
            <Flex justify="space-between" align="center">
              <Badge variant={getStatusColor(goal.status)}>{goal.status}</Badge>
              <Badge variant={getPriorityColor(goal.priority)}>{goal.priority}</Badge>
            </Flex>
            
            {goal.description && (
              <Description>{goal.description}</Description>
            )}
            
            <MetaInfo>
              <MetaItem>
                <MetaLabel>Deadline:</MetaLabel>
                <MetaValue>{formatDate(goal.deadline)}</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Started:</MetaLabel>
                <MetaValue>{goal.startDate ? formatDate(goal.startDate) : 'Not started'}</MetaValue>
              </MetaItem>
              {goal.completionDate && (
                <MetaItem>
                  <MetaLabel>Completed:</MetaLabel>
                  <MetaValue>{formatDate(goal.completionDate)}</MetaValue>
                </MetaItem>
              )}
            </MetaInfo>
          </InfoCard>

          <TimerSection>
            <Flex justify="space-between" align="center">
              <Subtitle>Focus Timer</Subtitle>
              <Button 
                variant={isTimerActive ? 'danger' : 'primary'} 
                size="sm" 
                onClick={handleToggleTimer}
              >
                {isTimerActive ? 'Pause' : 'Start'}
              </Button>
            </Flex>
            <TimerDisplay isActive={isTimerActive}>
              {formatTime(timerDuration)}
            </TimerDisplay>
          </TimerSection>

          <ProgressSection>
            <Flex justify="space-between" align="center">
              <Subtitle>Progress</Subtitle>
              <Text>{completedTasks}/{goal.tasks.length} tasks</Text>
            </Flex>
            <ProgressBarContainer>
              <ProgressBar progress={progress} />
              <ProgressText>{progress}%</ProgressText>
            </ProgressBarContainer>
          </ProgressSection>

          <TasksSection>
            <Subtitle>Tasks</Subtitle>
            {goal.tasks.length > 0 ? (
              goal.tasks.map((task: any) => (
                <TaskCard 
                  key={task._id}
                  task={task}
                  onToggle={(completed) => handleTaskToggle(task._id, completed)}
                  highlight={lastTaskCompleted === task._id}
                />
              ))
            ) : (
              <Text>No tasks for this goal.</Text>
            )}
          </TasksSection>
        </StyledContent>
      </MainContent>
    </Container>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
  position: sticky;
  top: 0;
  background-color: var(--bg-color);
  z-index: 10;
  padding: var(--spacing-sm) 0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  padding: var(--spacing-sm);
  margin-right: var(--spacing-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background-color: var(--secondary-bg-color);
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`;

const InfoCard = styled(Card)`
  padding: var(--spacing-md);
`;

const Description = styled(Text)`
  margin: var(--spacing-md) 0;
  line-height: 1.6;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
`;

const MetaLabel = styled.span`
  font-weight: 500;
  width: 100px;
`;

const MetaValue = styled.span`
  color: var(--text-color);
`;

const TimerSection = styled(Card)`
  padding: var(--spacing-md);
`;

const TimerDisplay = styled.div<{ isActive: boolean }>`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin: var(--spacing-md) 0;
  color: ${({ isActive }) => isActive ? 'var(--primary-color)' : 'var(--text-color)'};
  animation: ${({ isActive }) => isActive ? 'pulse 1s infinite' : 'none'};
`;

const ProgressSection = styled(Card)`
  padding: var(--spacing-md);
`;

const ProgressBarContainer = styled.div`
  margin-top: var(--spacing-sm);
  position: relative;
  height: 24px;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 100%;
  background-color: var(--secondary-bg-color);
  border-radius: var(--border-radius);
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => `${progress}%`};
    background-color: var(--primary-color);
    transition: width 0.5s ease;
  }
`;

const ProgressText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-color);
  font-weight: 600;
  z-index: 1;
`;

const TasksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

export default GoalDetailPage; 