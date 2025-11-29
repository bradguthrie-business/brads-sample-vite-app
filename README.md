# React + Vite Application

This application is accessible at this link: [https://bradguthrie-business.github.io/brads-sample-vite-app/](https://bradguthrie-business.github.io/brads-sample-vite-app/)

This template provides a minimal setup to get a sample React application setup with Vite, ESLint, Prettier, and Husky for pre-commit hooks.

This app is intended to showcase my modern frontend React skills with hooks, state, reusable function components, styling consistency, unit testing, and more.

# Running the application locally

You will need an installation of Node.js on your machine to run this React application. [Please see the Download page for instructions on downloading and installing Node.js.](https://nodejs.org/en/download)

```bash
# Installing packages
npm install

# Initialize husky for pre-commit hooks (Prettier/ESLint)
npm run prepare

# Run the application locally
npm start
```

# Unit Tests

This project uses **Jest** and **React Testing Library** for unit and integration testing.

### Configuration Files

**jest.config.js**

- Configured for jsdom environment
- Globals enabled for test functions
- Setup file for jest-dom matchers

**src/test/setup.js**

- Imports @testing-library/jest-dom for extended matchers
- Can add global mocks here if needed

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended during development)
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Writing New Tests

When creating new component tests:

1. Place the test file next to the component: `ComponentName.test.jsx`
2. Import testing utilities from `@testing-library/react`
3. Wrap components with necessary providers
4. Test user interactions with `userEvent`
5. Assert using jest-dom matchers

Example:

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  it('does something', async () => {
    const user = userEvent.setup();
    render(<YourComponent />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

# Git Commit and Branching Strategy

We follow a simplified Git Flow approach:

### Branching

- **`main`** - Production-ready code. All code in this branch should be stable and deployable. All PRs are to be merged to this branch.
- **`feature/description-of-feature`** - Feature work.
- **`bugfix/description-of-bugfix`** - Bug fixes.
- **`chore/description-of-bugfix`** - Chore fixes that should not affect functionality of the application.

### Commit Types:

- **feature**: New features.
- **bugfix**: Bug fixes.
- **chore**: Changes to build process, styling, test updates, etc.

### Workflow Example:

**Creating a feature branch from the latest `main` branch:**

```bash
# Switch to main branch
git checkout main

# Get the latest changes
git pull origin main

# Create and switch to your feature branch
git checkout -b feature/adding-user-authentication
```

**Make your changes, then commit them:**

```bash
# Stage your changes (add specific files or use . for all)
git add .

# Commit with a descriptive message
git commit -m "feat: Adding user authentication"

# Push your branch to remote
git push origin feature/adding-user-authentication
```

**After pushing, create a Pull Request** on GitHub to merge your feature branch into `main`.

**Once merged, clean up your local branch:**

```bash
# Switch back to main
git checkout main

# Pull the latest changes (including your merged feature)
git pull origin main

# Delete your local feature branch, which should also be deleted after merging on remote
git branch -d feature/adding-user-authentication
```
