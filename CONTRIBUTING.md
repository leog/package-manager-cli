# Contributing to package-manager-alias-cli

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We welcome contributors of all experience levels.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/leog/package-manager-cli/issues)
2. If not, create a new issue with:
   - A clear, descriptive title
   - Steps to reproduce the problem
   - Expected vs actual behavior
   - Your environment (OS, Node.js version, package manager versions)

### Suggesting Features

1. Check existing issues for similar suggestions
2. Create a new issue describing:
   - The feature and its use case
   - How it would benefit users
   - Any implementation ideas you have

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Run linting: `npm run lint`
6. Format code: `npm run format`
7. Commit with a clear message
8. Push and open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/package-manager-cli.git
cd package-manager-cli

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
package-manager-alias-cli/
├── pm.js              # Main CLI executable
├── pm.test.js         # Test suite
├── package.json       # Project configuration
├── .eslintrc.js       # ESLint configuration
├── .prettierrc        # Prettier configuration
├── README.md          # User documentation
├── CONTRIBUTING.md    # This file
├── CHANGELOG.md       # Version history
└── LICENSE            # MIT license
```

## Testing

- Write tests for any new functionality
- Ensure all existing tests pass before submitting a PR
- Aim for meaningful test coverage, not just high percentages

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage
```

## Code Style

- We use ESLint and Prettier for consistent code style
- Run `npm run lint:fix` to auto-fix linting issues
- Run `npm run format` to format code with Prettier

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add --verbose flag`
- `fix: correct error message for missing lockfile`
- `docs: update README with troubleshooting section`
- `test: add tests for version flag`
- `chore: update dependencies`

## Questions?

Feel free to open an issue if you have questions about contributing!
