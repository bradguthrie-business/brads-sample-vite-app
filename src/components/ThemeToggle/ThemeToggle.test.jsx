import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle Component', () => {
  it('renders with initial light theme', () => {
    render(<ThemeToggle />);

    expect(screen.getByText('Theme Toggle with useEffect')).toBeInTheDocument();
    expect(screen.getByText(/Current theme:/)).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  it('displays the correct button text for light theme', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles to dark theme when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /switch to dark mode/i });
    await user.click(button);

    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /switch to light mode/i })
    ).toBeInTheDocument();
  });

  it('toggles back to light theme', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /switch to dark mode/i });

    // Toggle to dark
    await user.click(button);
    expect(screen.getByText('Dark')).toBeInTheDocument();

    // Toggle back to light
    const lightButton = screen.getByRole('button', {
      name: /switch to light mode/i,
    });
    await user.click(lightButton);
    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  it('applies dark-theme class to body when toggled', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    expect(document.body.classList.contains('dark-theme')).toBe(false);

    const button = screen.getByRole('button', { name: /switch to dark mode/i });
    await user.click(button);

    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  it('removes dark-theme class from body when toggled back', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /switch to dark mode/i });
    await user.click(button);
    expect(document.body.classList.contains('dark-theme')).toBe(true);

    const lightButton = screen.getByRole('button', {
      name: /switch to light mode/i,
    });
    await user.click(lightButton);
    expect(document.body.classList.contains('dark-theme')).toBe(false);
  });

  it('displays useEffect information text', () => {
    render(<ThemeToggle />);

    expect(screen.getByText(/This component uses/)).toBeInTheDocument();
    expect(screen.getByText('useEffect')).toBeInTheDocument();
  });

  it('handles multiple rapid toggles correctly', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /switch to dark mode/i });

    await user.click(button);
    const lightButton = screen.getByRole('button', {
      name: /switch to light mode/i,
    });
    await user.click(lightButton);
    const darkButton = screen.getByRole('button', {
      name: /switch to dark mode/i,
    });
    await user.click(darkButton);

    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });
});
