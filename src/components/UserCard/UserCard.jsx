import { Check, Heart, Minus, UserPlus } from 'lucide-react';
import { useEffect } from 'react';
import { useFollow } from '../../context/FollowContext';
import './UserCard.scss';

export const UserCard = ({ userId, name, role, icon: IconComponent }) => {
  const { toggleFollow, isFollowing, toggleLike, getLikeCount, setLikeCount } =
    useFollow();

  useEffect(() => {
    setLikeCount(userId, getLikeCount(userId));
  }, [userId]);

  const isUserFollowing = isFollowing(userId);
  console.log('isFollowing', isFollowing, userId);
  const likes = getLikeCount(userId);

  const handleLike = () => {
    toggleLike(userId);
  };

  const handleToggleFollow = () => {
    toggleFollow(userId);
  };

  return (
    <div className="user-card">
      <div className="user-avatar">
        <IconComponent size={64} strokeWidth={1.5} />
      </div>
      <h4 className="user-name">{name}</h4>
      <p className="user-role">{role}</p>
      <div className="user-stats">
        <div className="stat">
          <span className="stat-value">{likes}</span>
          <span className="stat-label">Likes</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {isUserFollowing ? <Check size={20} /> : <Minus size={20} />}
          </span>
          <span className="stat-label">Following</span>
        </div>
      </div>
      <div className="user-actions">
        <button onClick={handleLike} className="action-btn like-btn">
          <Heart size={18} /> Like
        </button>
        <button
          onClick={handleToggleFollow}
          className={`action-btn follow-btn ${isUserFollowing ? 'following' : ''}`}
        >
          {isUserFollowing ? (
            <>
              <Check size={18} /> Following
            </>
          ) : (
            <>
              <UserPlus size={18} /> Follow
            </>
          )}
        </button>
      </div>
    </div>
  );
};
