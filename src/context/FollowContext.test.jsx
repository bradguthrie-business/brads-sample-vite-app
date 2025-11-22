import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FollowProvider, useFollow } from './FollowContext';

describe('FollowContext', () => {
  it('provides initial empty follow state', () => {
    const { result } = renderHook(() => useFollow(), {
      wrapper: FollowProvider,
    });

    expect(result.current.getFollowCount()).toBe(0);
    expect(result.current.isFollowing('user-1')).toBe(false);
  });

  it('toggles follow state for a user', () => {
    const { result } = renderHook(() => useFollow(), {
      wrapper: FollowProvider,
    });

    act(() => {
      result.current.toggleFollow('user-1');
    });

    expect(result.current.isFollowing('user-1')).toBe(true);
    expect(result.current.getFollowCount()).toBe(1);
  });

  it('unfollows a previously followed user', () => {
    const { result } = renderHook(() => useFollow(), {
      wrapper: FollowProvider,
    });

    act(() => {
      result.current.toggleFollow('user-1');
    });

    expect(result.current.isFollowing('user-1')).toBe(true);

    act(() => {
      result.current.toggleFollow('user-1');
    });

    expect(result.current.isFollowing('user-1')).toBe(false);
    expect(result.current.getFollowCount()).toBe(0);
  });

  it('tracks multiple followed users', () => {
    const { result } = renderHook(() => useFollow(), {
      wrapper: FollowProvider,
    });

    act(() => {
      result.current.toggleFollow('user-1');
      result.current.toggleFollow('user-2');
      result.current.toggleFollow('user-3');
    });

    expect(result.current.isFollowing('user-1')).toBe(true);
    expect(result.current.isFollowing('user-2')).toBe(true);
    expect(result.current.isFollowing('user-3')).toBe(true);
    expect(result.current.getFollowCount()).toBe(3);
  });

  it('maintains independent follow states for different users', () => {
    const { result } = renderHook(() => useFollow(), {
      wrapper: FollowProvider,
    });

    act(() => {
      result.current.toggleFollow('user-1');
      result.current.toggleFollow('user-2');
    });

    expect(result.current.isFollowing('user-1')).toBe(true);
    expect(result.current.isFollowing('user-2')).toBe(true);

    act(() => {
      result.current.toggleFollow('user-1');
    });

    expect(result.current.isFollowing('user-1')).toBe(false);
    expect(result.current.isFollowing('user-2')).toBe(true);
    expect(result.current.getFollowCount()).toBe(1);
  });

  it('handles rapid toggle operations', () => {
    const { result } = renderHook(() => useFollow(), {
      wrapper: FollowProvider,
    });

    act(() => {
      result.current.toggleFollow('user-1');
      result.current.toggleFollow('user-1');
      result.current.toggleFollow('user-1');
    });

    expect(result.current.isFollowing('user-1')).toBe(true);
    expect(result.current.getFollowCount()).toBe(1);
  });

  it('returns correct count after multiple operations', () => {
    const { result } = renderHook(() => useFollow(), {
      wrapper: FollowProvider,
    });

    act(() => {
      result.current.toggleFollow('user-1');
      result.current.toggleFollow('user-2');
      result.current.toggleFollow('user-3');
      result.current.toggleFollow('user-4');
      result.current.toggleFollow('user-2'); // Unfollow user-2
    });

    expect(result.current.getFollowCount()).toBe(3);
    expect(result.current.isFollowing('user-2')).toBe(false);
  });

  it('throws error when useFollow is used outside provider', () => {
    expect(() => {
      renderHook(() => useFollow());
    }).toThrow('useFollow must be used within a FollowProvider');
  });
});
