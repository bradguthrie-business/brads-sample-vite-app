import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter Component', () => {
  it('should render with the initial value when provided', () => {
    render(<Counter initialValue={5} step={1} />);

    expect(screen.getByText('Counter Component')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render with default initial value of 0 when no initial value is provided', () => {
    render(<Counter />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should increment count when increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} step={1} />);

    const incrementButton = screen.getByRole('button', { name: /\+ 1/i });
    await user.click(incrementButton);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should decrement count when decrement button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} step={1} />);

    const decrementButton = screen.getByRole('button', { name: /- 1/i });
    await user.click(decrementButton);

    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('should reset count to initial value when reset button is clicked', async () => {
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

  it('should use custom step value for increment and decrement when step prop is provided', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} step={5} />);

    const incrementButton = screen.getByRole('button', { name: /\+ 5/i });
    const decrementButton = screen.getByRole('button', { name: /- 5/i });

    await user.click(incrementButton);
    expect(screen.getByText('5')).toBeInTheDocument();

    await user.click(decrementButton);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should handle multiple increments correctly when increment button is clicked repeatedly', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} step={3} />);

    const incrementButton = screen.getByRole('button', { name: /\+ 3/i });

    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);

    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('should allow count to go into negative numbers when decremented below zero', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} step={1} />);

    const decrementButton = screen.getByRole('button', { name: /- 1/i });

    await user.click(decrementButton);
    await user.click(decrementButton);

    expect(screen.getByText('-2')).toBeInTheDocument();
  });
});
