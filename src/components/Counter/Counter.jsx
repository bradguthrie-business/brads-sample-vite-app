import { useState } from 'react';
import './Counter.scss';

export const Counter = ({ initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);

  return (
    <div className="counter">
      <h3>Counter Component</h3>
      <div className="counter-display">{count}</div>
      <div className="counter-controls">
        <button onClick={decrement} className="btn btn-secondary">
          - {step}
        </button>
        <button onClick={reset} className="btn btn-neutral">
          Reset
        </button>
        <button onClick={increment} className="btn btn-primary">
          + {step}
        </button>
      </div>
    </div>
  );
};
