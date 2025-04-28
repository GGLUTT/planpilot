import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useGoals } from '../context/GoalsContext';
import { 
  Container, 
  MainContent, 
  Title, 
  Text, 
  Subtitle,
  Button,
  EmptyState,
  LoadingContainer,
  Loader,
  Section
} from '../styles/StyledComponents';
import ProfileHeader from '../components/ProfileHeader';
import GoalCard from '../components/GoalCard';

const HomePage: React.FC = () => {
  const { user, isLoading: userLoading } = useUser();
  const { goals, isLoading: goalsLoading, fetchGoals } = useGoals();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchGoals(user.userId);
    }
  }, [user, fetchGoals]);

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleGoalClick = (goalId: string) => {
    navigate(`/goals/${goalId}`);
  };

  if (userLoading || goalsLoading) {
    return (
      <Container>
        <LoadingContainer>
          <Loader />
          <Text>Loading...</Text>
        </LoadingContainer>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <EmptyState>
          <div>👤</div>
          <Text>User not found. Please restart the app.</Text>
        </EmptyState>
      </Container>
    );
  }

  // Get in-progress goals
  const inProgressGoals = goals.filter(goal => goal.status === 'in-progress');
  
  // Get pending goals
  const pendingGoals = goals.filter(goal => goal.status === 'pending');

  // Calculate overall progress
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const totalGoals = goals.length;
  const progressPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <Container>
      <MainContent>
        <ProfileHeader user={user} onEditProfile={handleEditProfile} />
        
        <WelcomeSection
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Title>Welcome back, {user.firstName}!</Title>
          <Text>Track your progress and achieve your goals.</Text>
          
          <ProgressContainer>
            <ProgressInfo>
              <Subtitle>Overall Progress</Subtitle>
              <ProgressPercentage>{progressPercentage}%</ProgressPercentage>
            </ProgressInfo>
            <ProgressBarContainer>
              <ProgressBar progress={progressPercentage} />
            </ProgressBarContainer>
            <ProgressStats>
              <ProgressStat>
                <StatValue>{completedGoals}</StatValue>
                <StatLabel>Completed</StatLabel>
              </ProgressStat>
              <ProgressStat>
                <StatValue>{inProgressGoals.length}</StatValue>
                <StatLabel>In Progress</StatLabel>
              </ProgressStat>
              <ProgressStat>
                <StatValue>{pendingGoals.length}</StatValue>
                <StatLabel>Pending</StatLabel>
              </ProgressStat>
            </ProgressStats>
          </ProgressContainer>
        </WelcomeSection>
        
        <Section>
          <SectionHeader>
            <Subtitle>In Progress</Subtitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/goals')}
            >
              View All
            </Button>
          </SectionHeader>
          
          {inProgressGoals.length > 0 ? (
            <GoalsGrid>
              {inProgressGoals.slice(0, 2).map(goal => (
                <GoalCard 
                  key={goal._id} 
                  goal={goal} 
                  onClick={() => handleGoalClick(goal._id)}
                />
              ))}
            </GoalsGrid>
          ) : (
            <EmptyState>
              <div>🎯</div>
              <Text>No goals in progress. Start by adding one!</Text>
              <Button onClick={() => navigate('/add')}>Add Goal</Button>
            </EmptyState>
          )}
        </Section>
        
        <Section>
          <SectionHeader>
            <Subtitle>Up Next</Subtitle>
          </SectionHeader>
          
          {pendingGoals.length > 0 ? (
            <GoalsGrid>
              {pendingGoals.slice(0, 2).map(goal => (
                <GoalCard 
                  key={goal._id} 
                  goal={goal} 
                  onClick={() => handleGoalClick(goal._id)}
                />
              ))}
            </GoalsGrid>
          ) : (
            <EmptyState>
              <div>📋</div>
              <Text>No pending goals. You're all caught up!</Text>
            </EmptyState>
          )}
        </Section>
      </MainContent>
    </Container>
  );
};

const WelcomeSection = styled.section`
  margin-bottom: var(--spacing-lg);
`;

const ProgressContainer = styled.div`
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
  margin-top: var(--spacing-md);
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`;

const ProgressPercentage = styled.span`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--primary-color);
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 12px;
  background-color: var(--secondary-bg-color);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: var(--spacing-md);
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background-color: var(--primary-color);
  border-radius: 6px;
  transition: width 0.5s ease;
`;

const ProgressStats = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ProgressStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatValue = styled.span`
  font-size: var(--font-size-lg);
  font-weight: 600;
`;

const StatLabel = styled.span`
  font-size: var(--font-size-xs);
  color: var(--hint-color);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const GoalsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
  
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default HomePage; 