import React from 'react';
import { Users } from 'lucide-react';
import { useFollow } from '../../context/FollowContext';
import './FollowingStatus.scss';

export const FollowingStatus = () => {
  const { getFollowCount } = useFollow();
  const count = getFollowCount();
  const textToDisplay =
    count === 0
      ? 'You are not following anyone.'
      : `You are following ${count} ${count === 1 ? 'person.' : 'people.'}`;

  return (
    <div className="following-status-container">
      <Users size={24} />
      <div className="following-status-text">{textToDisplay}</div>
    </div>
  );
};
