import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { updateUser } from '../api/api';
import { 
  Container, 
  MainContent, 
  Title, 
  Button,
  Input,
  Label,
  FormGroup,
  FormControl,
  BackButton
} from '../styles/StyledComponents';

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [username, setUsername] = useState(user?.username || '');
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedUser = await updateUser(user.userId, { username, photoUrl });
      setUser(updatedUser);
      navigate('/');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Container>
        <MainContent>
          <Title>User not found</Title>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <MainContent>
        <HeaderContainer>
          <BackButton onClick={handleBack}>←</BackButton>
          <Title>Edit Profile</Title>
        </HeaderContainer>

        <FormContainer
          as={motion.form}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
        >
          <UserInfo>
            <UserInitials>{user.firstName.charAt(0)}{user.lastName ? user.lastName.charAt(0) : ''}</UserInitials>
            <UserDetails>
              <UserName>{user.firstName} {user.lastName}</UserName>
              <UserId>ID: {user.userId}</UserId>
            </UserDetails>
          </UserInfo>

          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <FormControl>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
              />
            </FormControl>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="photoUrl">Profile Photo URL</Label>
            <FormControl>
              <Input
                id="photoUrl"
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://example.com/your-photo.jpg"
              />
              <HelpText>Enter a URL to your profile photo</HelpText>
            </FormControl>
          </FormGroup>

          {photoUrl && (
            <PhotoPreviewContainer>
              <PhotoPreview src={photoUrl} alt="Profile preview" />
            </PhotoPreviewContainer>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </FormContainer>
      </MainContent>
    </Container>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-lg);
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
`;

const UserInitials = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  font-weight: bold;
  margin-right: var(--spacing-md);
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: 4px;
`;

const UserId = styled.div`
  font-size: var(--font-size-sm);
  color: var(--hint-color);
  font-family: monospace;
`;

const HelpText = styled.div`
  font-size: var(--font-size-xs);
  color: var(--hint-color);
  margin-top: 4px;
`;

const PhotoPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: var(--spacing-md) 0;
`;

const PhotoPreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  font-size: var(--font-size-sm);
  padding: var(--spacing-sm);
  background-color: var(--error-bg-color);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-md);
`;

export default EditProfilePage; 