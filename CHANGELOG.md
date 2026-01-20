# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.1.0 (2026-01-20)


### Features

* add CLI flags, tests, docs, and dev tooling (v1.0.1) ([895794a](https://github.com/leog/package-manager-cli/commit/895794a6589146167088e08d91a050e5ed999116))

## [1.0.1] - 2024-01-19

### Added

- `--version` / `-v` flag to display version number
- `--help` / `-h` flag to display usage information
- `--verbose` flag to show which package manager is being used
- Comprehensive test suite with Jest
- ESLint and Prettier for code quality
- GitHub Actions CI workflow
- CONTRIBUTING.md guidelines
- LICENSE file (MIT)
- This CHANGELOG file

### Fixed

- Error messages now show the actual detected package manager instead of hardcoded "npm"
- Improved error handling when no package manager can be detected

### Changed

- Refactored to use async/await instead of Promise.then()
- Expanded README with more examples and troubleshooting section
- Added engines field requiring Node.js >= 14.0.0

## [1.0.0] - 2024-08-01

### Added

- Initial release
- Basic `pm` command that auto-detects and uses the appropriate package manager
- Support for npm, yarn, pnpm, and bun
- Lockfile-based detection priority
