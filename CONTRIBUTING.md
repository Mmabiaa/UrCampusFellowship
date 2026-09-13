# Contributing to UrCampusFellowship

Thank you for your interest in contributing to UrCampusFellowship! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/mmabiaa/urcampusfellowship.git
   cd urcampusfellowship
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/urcampusfellowship.git
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Environment Variables

Create a `.env.local` file in the root directory (not committed to git):

```env
# Add environment variables here when backend is integrated
# NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
```

---

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug fixes**: Fix issues in existing code
- **Features**: Add new functionality
- **Documentation**: Improve or add documentation
- **Tests**: Add or improve test coverage
- **Design**: UI/UX improvements
- **Refactoring**: Code quality improvements

### Finding Work

- Check the [Issues](https://github.com/mmabiaa/urcampusfellowship/issues) page
- Look for issues labeled `good first issue` or `help wanted`
- Comment on an issue to let others know you're working on it

### Reporting Bugs

When reporting bugs, include:

- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/device information
- Error messages or logs

### Suggesting Features

Feature requests should include:

- Clear use case
- Expected behavior
- Mockups or examples (if applicable)
- Why this benefits users

---

## Coding Standards

### General Principles

- Write clean, readable, maintainable code
- Follow existing patterns in the codebase
- Keep functions small and focused
- Use meaningful variable and function names
- Add comments for complex logic

### TypeScript

- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Export types from `src/types/index.ts`
- Use interfaces for object shapes

### File Naming

- **Components**: `kebab-case.tsx` (e.g., `site-header.tsx`)
- **Pages**: `page.tsx` (Next.js convention)
- **Types**: `kebab-case.ts` (e.g., `user-types.ts`)
- **Utilities**: `kebab-case.ts` (e.g., `format-date.ts`)

### Component Structure

```typescript
"use client"; // Only if needed

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";

interface ComponentProps {
  user: User;
  onAction: () => void;
}

export function ComponentName({ user, onAction }: ComponentProps) {
  const [state, setState] = useState(false);

  const handleClick = () => {
    // Logic here
  };

  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow existing spacing/sizing patterns
- Maintain responsive design
- Support dark mode
- Keep styles close to components

### Import Order

1. React and Next.js imports
2. Third-party libraries
3. Components
4. Types
5. Utils and constants

```typescript
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layouts/app-layout";
import type { User } from "@/types";
import { formatDate } from "@/lib/utils";
```

---

## Commit Guidelines

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(auth): add email verification flow
fix(directory): resolve search filter bug
docs(readme): update installation instructions
refactor(components): extract shared form fields
test(profile): add profile page tests
```

### Best Practices

- Keep commits atomic (one logical change per commit)
- Write clear, descriptive commit messages
- Reference issue numbers when applicable: `fixes #123`

---

## Pull Request Process

### Before Submitting

1. **Update your branch** with latest upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests and linting**:
   ```bash
   npm run lint
   npm run type-check
   npm test  # When tests are added
   ```

3. **Test your changes** manually

4. **Update documentation** if needed

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Tested on desktop and mobile
- [ ] Tested in light and dark mode
- [ ] TypeScript compiles without errors
- [ ] ESLint passes without errors

### PR Title

Use the same format as commit messages:

```
feat(directory): add advanced search filters
```

### PR Description

Include:

- What changed and why
- Issue reference (if applicable)
- Screenshots (for UI changes)
- Testing instructions
- Breaking changes (if any)

### Review Process

1. A maintainer will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited

---

## Testing

### Running Tests

```bash
# Run all tests (when implemented)
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Write tests for new features
- Update tests for modified code
- Aim for meaningful test coverage
- Test edge cases and error scenarios

---

## Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Document non-obvious logic
- Keep comments up to date

### README Updates

Update README.md when:

- Adding new features
- Changing setup process
- Modifying commands
- Adding dependencies

---

## Questions?

If you have questions:

1. Check existing documentation
2. Search closed issues
3. Ask in a new issue
4. Reach out to maintainers

---

## Recognition

Contributors will be:

- Listed in the project's contributor list
- Credited in release notes
- Acknowledged in the README

Thank you for contributing to UrCampusFellowship! 🎉
