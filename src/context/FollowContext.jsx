import { createContext, useContext, useState } from 'react';

const FollowContext = createContext();

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
};

export const FollowProvider = ({ children }) => {
  const [followedUsers, setFollowedUsers] = useState(new Set());

  const toggleFollow = userId => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const isFollowing = userId => {
    return followedUsers.has(userId);
  };

  const getFollowCount = () => {
    return followedUsers.size;
  };

  return (
    <FollowContext.Provider
      value={{ toggleFollow, isFollowing, getFollowCount }}
    >
      {children}
    </FollowContext.Provider>
  );
};
