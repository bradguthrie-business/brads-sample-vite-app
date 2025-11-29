import { render, screen } from '@testing-library/react';
import { useFollow } from '../../context/FollowContext';
import { FollowingStatus } from './FollowingStatus';

jest.mock('../../context/FollowContext', () => ({
  useFollow: jest.fn(),
}));

describe('FollowingStatus Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the FollowingStatus component with default text of "You are not following anyone." when given a count of 0 users followed.', async () => {
    const numUsersFollowing = 0;
    useFollow.mockReturnValue({
      getFollowCount: jest.fn().mockReturnValue(numUsersFollowing),
    });

    render(<FollowingStatus />);

    expect(
      screen.getByText('You are not following anyone.')
    ).toBeInTheDocument();
  });

  it('should render the FollowingStatus component with text "You are following 1 person." when given a count of 1 user followed.', async () => {
    const numUsersFollowing = 1;
    useFollow.mockReturnValue({
      getFollowCount: jest.fn().mockReturnValue(numUsersFollowing),
    });

    render(<FollowingStatus />);

    expect(screen.getByText('You are following 1 person.')).toBeInTheDocument();
  });

  it('should render the FollowingStatus component with text "You are following 2 people." when given a count of 2 users followed.', async () => {
    const numUsersFollowing = 2;
    useFollow.mockReturnValue({
      getFollowCount: jest.fn().mockReturnValue(numUsersFollowing),
    });

    render(<FollowingStatus />);

    expect(screen.getByText('You are following 2 people.')).toBeInTheDocument();
  });
});
