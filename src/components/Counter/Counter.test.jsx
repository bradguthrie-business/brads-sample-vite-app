import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Counter } from './Counter';

describe('Counter Component', () => {
  it('renders with initial value', () => {
    render(<Counter initialValue={5} step={1} />);

    expect(screen.getByText('Counter Component')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders with default initial value of 0', () => {
    render(<Counter />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments count when increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} step={1} />);

    const incrementButton = screen.getByRole('button', { name: /\+ 1/i });
    await user.click(incrementButton);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('decrements count when decrement button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} step={1} />);

    const decrementButton = screen.getByRole('button', { name: /- 1/i });
    await user.click(decrementButton);

    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('resets count to initial value when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={10} step={2} />);

    const incrementButton = screen.getByRole('button', { name: /\+ 2/i });
    const resetButton = screen.getByRole('button', { name: /reset/i });

    // Increment a few times
    await user.click(incrementButton);
    await user.click(incrementButton);
    expect(screen.getByText('14')).toBeInTheDocument();

    // Reset
    await user.click(resetButton);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('uses custom step value for increment and decrement', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} step={5} />);

    const incrementButton = screen.getByRole('button', { name: /\+ 5/i });
    const decrementButton = screen.getByRole('button', { name: /- 5/i });

    await user.click(incrementButton);
    expect(screen.getByText('5')).toBeInTheDocument();

    await user.click(decrementButton);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles multiple increments correctly', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} step={3} />);

    const incrementButton = screen.getByRole('button', { name: /\+ 3/i });

    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);

    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('can go into negative numbers', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} step={1} />);

    const decrementButton = screen.getByRole('button', { name: /- 1/i });

    await user.click(decrementButton);
    await user.click(decrementButton);

    expect(screen.getByText('-2')).toBeInTheDocument();
  });
});
