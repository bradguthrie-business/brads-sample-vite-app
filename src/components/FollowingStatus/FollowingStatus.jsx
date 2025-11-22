import { Users } from 'lucide-react';
import { useFollow } from '../../context/FollowContext';
import './FollowingStatus.css';

export const FollowingStatus = () => {
  const { getFollowCount } = useFollow();
  const count = getFollowCount();

  return (
    <div className="following-status">
      <Users size={24} />
      <span>
        You are following <strong>{count}</strong>{' '}
        {count === 1 ? 'person' : 'people'}
      </span>
    </div>
  );
};
