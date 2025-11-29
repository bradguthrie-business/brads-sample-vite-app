import { Code, LayoutDashboard, Palette, Rocket } from 'lucide-react';
import './App.scss';
import reactLogo from './assets/react.svg';
import { Counter } from './components/Counter/Counter';
import { FollowingStatus } from './components/FollowingStatus/FollowingStatus';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { UserCard } from './components/UserCard/UserCard';
import viteLogo from '/vite.svg';

export const App = () => {
  return (
    <>
      <div className="react-app-logos">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="components-container">
        <div className="component-showcase-header">
          Basic React Component Showcase
        </div>
        <div className="component-showcase-text">
          This is intended to showcase my modern React skills, including
          reusable components, hooks, state, and more. Enjoy!
        </div>

        {/* Displays the Counter and ThemeToggle components */}
        <div className="component-grid">
          <Counter initialValue={0} step={1} />
          <ThemeToggle />
        </div>

        {/* Displays the Card Components and use of React State, React Context */}
        <div className="card-component-showcase-container">
          <div className="component-showcase-header">
            Card Component Showcase
          </div>
          <div className="component-showcase-text">
            This section shows the use of React Context. We keep track of the
            state!
          </div>
          <FollowingStatus />
          <div className="component-grid">
            <UserCard
              userId="alex-rivera"
              name="Alex Rivera"
              role="Full Stack Engineer"
              icon={Rocket}
            />
            <UserCard
              userId="sarah-anderson"
              name="Sarah Anderson"
              role="Frontend Developer"
              icon={Code}
            />
            <UserCard
              userId="satoshi-nakamoto"
              name="Satoshi Nakamoto"
              role="UI/UX Designer"
              icon={Palette}
            />
            <UserCard
              userId="jamie-williams"
              name="Jamie Williams"
              role="Product Manager"
              icon={LayoutDashboard}
            />
          </div>
        </div>
      </div>
    </>
  );
};
