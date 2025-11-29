import { createContext, useContext, useEffect, useState } from 'react';

const FollowContext = createContext();

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
};

export const FollowProvider = ({ children }) => {
  // Followed users state
  const [followedUsers, setFollowedUsers] = useState(() => {
    const stored = localStorage.getItem('followedUsers');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  // Likes state: { [userId]: likeCount }
  const [likes, setLikes] = useState(() => {
    const stored = localStorage.getItem('userLikes');
    return stored ? JSON.parse(stored) : {};
  });

  // Persist followed users
  useEffect(() => {
    localStorage.setItem(
      'followedUsers',
      JSON.stringify(Array.from(followedUsers))
    );
  }, [followedUsers]);

  // Persist likes
  useEffect(() => {
    localStorage.setItem('userLikes', JSON.stringify(likes));
  }, [likes]);

  // Toggle follow
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

  // Increment like count for user
  const toggleLike = userId => {
    setLikes(prev => {
      const current = prev[userId] || 0;
      return { ...prev, [userId]: current + 1 };
    });
  };

  // Set like count directly (for initialLikes)
  const setLikeCount = (userId, count) => {
    setLikes(prev => ({ ...prev, [userId]: count }));
  };

  // Get like count for a user
  const getLikeCount = userId => {
    return likes[userId] || 0;
  };

  const isFollowing = userId => followedUsers.has(userId);
  const getFollowCount = () => followedUsers.size;

  return (
    <FollowContext.Provider
      value={{
        toggleFollow,
        isFollowing,
        getFollowCount,
        toggleLike,
        getLikeCount,
        setLikeCount,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};
