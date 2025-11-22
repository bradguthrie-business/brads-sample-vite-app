import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { FollowProvider, useFollow } from '../../context/FollowContext';
import { FollowingStatus } from './FollowingStatus';

// Mock UserCard to test the context integration
const MockUserCard = ({ userId }) => {
  const { toggleFollow } = useFollow();
  return <button onClick={() => toggleFollow(userId)}>Follow {userId}</button>;
};

const renderWithProvider = ui => {
  return render(<FollowProvider>{ui}</FollowProvider>);
};

describe('FollowingStatus Component', () => {
  it('renders with initial count of 0', () => {
    renderWithProvider(<FollowingStatus />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText(/you are following/i)).toBeInTheDocument();
    expect(screen.getByText(/people/i)).toBeInTheDocument();
  });

  it('displays "person" when following exactly 1 user', async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <>
        <FollowingStatus />
        <MockUserCard userId="user-1" />
      </>
    );

    const followButton = screen.getByRole('button', { name: /follow user-1/i });
    await user.click(followButton);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/person/i)).toBeInTheDocument();
  });

  it('displays "people" when following multiple users', async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <>
        <FollowingStatus />
        <MockUserCard userId="user-1" />
        <MockUserCard userId="user-2" />
        <MockUserCard userId="user-3" />
      </>
    );

    const followButtons = screen.getAllByRole('button', {
      name: /follow user-/i,
    });

    await user.click(followButtons[0]);
    await user.click(followButtons[1]);
    await user.click(followButtons[2]);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/people/i)).toBeInTheDocument();
  });

  it('updates count in real-time when users are followed', async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <>
        <FollowingStatus />
        <MockUserCard userId="user-1" />
        <MockUserCard userId="user-2" />
      </>
    );

    expect(screen.getByText('0')).toBeInTheDocument();

    const followButtons = screen.getAllByRole('button', {
      name: /follow user-/i,
    });

    await user.click(followButtons[0]);
    expect(screen.getByText('1')).toBeInTheDocument();

    await user.click(followButtons[1]);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('decrements count when users are unfollowed', async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <>
        <FollowingStatus />
        <MockUserCard userId="user-1" />
      </>
    );

    const followButton = screen.getByRole('button', { name: /follow user-1/i });

    await user.click(followButton);
    expect(screen.getByText('1')).toBeInTheDocument();

    await user.click(followButton);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('displays "You are following" text', () => {
    renderWithProvider(<FollowingStatus />);

    expect(screen.getByText(/you are following/i)).toBeInTheDocument();
  });

  it('handles multiple follow/unfollow actions correctly', async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <>
        <FollowingStatus />
        <MockUserCard userId="user-1" />
        <MockUserCard userId="user-2" />
        <MockUserCard userId="user-3" />
      </>
    );

    const followButtons = screen.getAllByRole('button');

    // Follow all three
    await user.click(followButtons[0]);
    await user.click(followButtons[1]);
    await user.click(followButtons[2]);
    expect(screen.getByText('3')).toBeInTheDocument();

    // Unfollow one
    await user.click(followButtons[1]);
    expect(screen.getByText('2')).toBeInTheDocument();

    // Unfollow another
    await user.click(followButtons[0]);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
