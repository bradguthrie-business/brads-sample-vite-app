import { Code, LayoutDashboard, Palette, Rocket } from 'lucide-react';
import './App.css';
import reactLogo from './assets/react.svg';
import { Counter } from './components/Counter/Counter';
import { FollowingStatus } from './components/FollowingStatus/FollowingStatus';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { UserCard } from './components/UserCard/UserCard';
import viteLogo from '/vite.svg';

export const App = () => {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div className="card-text">
          This is a sample Vite app built with React.
        </div>
        <div className="card-text">
          This is intended to showcase my modern React skills, including
          reusable components, hooks, state, and more. Enjoy!
        </div>
      </div>

      <section className="components-section">
        <h2>React Component Showcase</h2>

        <div className="component-grid">
          <Counter initialValue={0} step={1} />
          <ThemeToggle />
        </div>

        <div className="component-grid">
          <UserCard
            userId="alex-rivera"
            name="Alex Rivera"
            role="Full Stack Engineer"
            icon={Rocket}
            initialLikes={21}
          />
          <UserCard
            userId="sarah-anderson"
            name="Sarah Anderson"
            role="Frontend Developer"
            icon={Code}
            initialLikes={42}
          />
          <UserCard
            userId="satoshi-nakamoto"
            name="Satoshi Nakamoto"
            role="UI/UX Designer"
            icon={Palette}
            initialLikes={38}
          />
          <UserCard
            userId="jamie-williams"
            name="Jamie Williams"
            role="Product Manager"
            icon={LayoutDashboard}
            initialLikes={35}
          />
        </div>
        <FollowingStatus />
      </section>
    </>
  );
};
