import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { FollowProvider } from '../../context/FollowContext';
import { UserCard } from './UserCard';

// Mock icon component
const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

const renderWithProvider = ui => {
  return render(<FollowProvider>{ui}</FollowProvider>);
};

describe('UserCard Component', () => {
  const defaultProps = {
    userId: 'test-user-1',
    name: 'John Doe',
    role: 'Software Engineer',
    icon: MockIcon,
    initialLikes: 10,
  };

  it('renders user information correctly', () => {
    renderWithProvider(<UserCard {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders the icon component', () => {
    renderWithProvider(<UserCard {...defaultProps} />);

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('displays Like and Follow buttons', () => {
    renderWithProvider(<UserCard {...defaultProps} />);

    expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /follow/i })).toBeInTheDocument();
  });

  it('increments likes when like button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProvider(<UserCard {...defaultProps} />);

    const likeButton = screen.getByRole('button', { name: /like/i });

    expect(screen.getByText('10')).toBeInTheDocument();

    await user.click(likeButton);
    expect(screen.getByText('11')).toBeInTheDocument();

    await user.click(likeButton);
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('toggles follow state when follow button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProvider(<UserCard {...defaultProps} />);

    const followButton = screen.getByRole('button', { name: /^follow$/i });
    expect(followButton).toBeInTheDocument();

    await user.click(followButton);

    const followingButton = screen.getByRole('button', { name: /following/i });
    expect(followingButton).toBeInTheDocument();
    expect(followingButton).toHaveClass('following');
  });

  it('unfollows when clicking following button', async () => {
    const user = userEvent.setup();
    renderWithProvider(<UserCard {...defaultProps} />);

    const followButton = screen.getByRole('button', { name: /^follow$/i });
    await user.click(followButton);

    const followingButton = screen.getByRole('button', { name: /following/i });
    await user.click(followingButton);

    expect(
      screen.getByRole('button', { name: /^follow$/i })
    ).toBeInTheDocument();
  });

  it('uses default initialLikes of 0 when not provided', () => {
    const propsWithoutLikes = {
      userId: 'test-user-2',
      name: 'Jane Doe',
      role: 'Designer',
      icon: MockIcon,
    };

    renderWithProvider(<UserCard {...propsWithoutLikes} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('displays following status indicator', () => {
    renderWithProvider(<UserCard {...defaultProps} />);

    expect(screen.getByText('Likes')).toBeInTheDocument();
    expect(screen.getByText('Following')).toBeInTheDocument();
  });

  it('maintains independent like counts for each card', async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <>
        <UserCard {...defaultProps} userId="user-1" initialLikes={5} />
        <UserCard {...defaultProps} userId="user-2" initialLikes={8} />
      </>
    );

    const likeButtons = screen.getAllByRole('button', { name: /like/i });

    await user.click(likeButtons[0]);

    // Get all stat-value elements and check the like counts
    const firstCardLikes = screen.getAllByText('6');
    const secondCardLikes = screen.getAllByText('8');

    expect(firstCardLikes.length).toBeGreaterThan(0);
    expect(secondCardLikes.length).toBeGreaterThan(0);
  });

  it('shares follow state across provider', async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <>
        <UserCard {...defaultProps} userId="shared-user" />
        <UserCard {...defaultProps} userId="shared-user" />
      </>
    );

    const followButtons = screen.getAllByRole('button', { name: /^follow$/i });

    await user.click(followButtons[0]);

    // Both cards should now show "Following"
    const followingButtons = screen.getAllByRole('button', {
      name: /following/i,
    });
    expect(followingButtons).toHaveLength(2);
  });
});
