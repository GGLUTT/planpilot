import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { User } from '../types';
import { Avatar, Title, IconButton } from '../styles/StyledComponents';

interface ProfileHeaderProps {
  user: User;
  onEditProfile: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEditProfile }) => {
  return (
    <ProfileContainer
      as={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ProfileContent>
        <AvatarContainer 
          as={motion.div}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {user.photoUrl ? (
            <ProfileAvatar size="lg">
              <img src={user.photoUrl} alt={user.firstName} />
            </ProfileAvatar>
          ) : (
            <ProfileAvatarPlaceholder size="lg">
              {user.firstName.charAt(0)}{user.lastName ? user.lastName.charAt(0) : ''}
            </ProfileAvatarPlaceholder>
          )}
        </AvatarContainer>
        
        <ProfileInfo>
          <ProfileName>{user.firstName} {user.lastName}</ProfileName>
          <Username>@{user.username}</Username>
          <UserIdBadge>ID: {user.userId}</UserIdBadge>
        </ProfileInfo>
        
        <EditButton onClick={onEditProfile}>
          <span>✏️</span>
        </EditButton>
      </ProfileContent>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const AvatarContainer = styled.div`
  margin-right: var(--spacing-md);
`;

const ProfileAvatar = styled(Avatar)`
  border: 3px solid var(--primary-color);
`;

const ProfileAvatarPlaceholder = styled(Avatar)`
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
  font-weight: bold;
  border: 3px solid var(--primary-color);
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled(Title)`
  margin-bottom: 4px;
`;

const Username = styled.p`
  font-size: var(--font-size-md);
  color: var(--hint-color);
  margin-bottom: 4px;
`;

const UserIdBadge = styled.div`
  display: inline-block;
  background-color: var(--secondary-bg-color);
  font-size: var(--font-size-xs);
  padding: 2px 8px;
  border-radius: 12px;
  color: var(--text-color);
  font-family: monospace;
  letter-spacing: 0.5px;
`;

const EditButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
`;

export default ProfileHeader; 