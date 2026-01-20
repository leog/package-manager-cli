# package-manager-alias-cli

[![npm version](https://img.shields.io/npm/v/package-manager-alias-cli.svg)](https://www.npmjs.com/package/package-manager-alias-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/leog/package-manager-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/leog/package-manager-cli/actions/workflows/ci.yml)

One command to use any\* package manager. A universal CLI that auto-detects and uses npm, yarn, pnpm, or bun.

## Install

```bash
npm install -g package-manager-alias-cli
```

Or with other package managers:

```bash
yarn global add package-manager-alias-cli
pnpm add -g package-manager-alias-cli
bun add -g package-manager-alias-cli
```

## Usage

Go to any Node.js project and use `pm` instead of your package manager:

```bash
# Instead of npm install / yarn install / pnpm install / bun install
pm install

# Instead of npm add lodash / yarn add lodash / pnpm add lodash / bun add lodash
pm add lodash

# Run scripts
pm run build
pm run test

# Any command works!
pm outdated
pm update
pm remove lodash
```

### Options

```
-v, --version   Show version number
-h, --help      Show help message
--verbose       Show which package manager is being used
```

### Examples

```bash
# Check the version
pm --version

# See help
pm --help

# See which package manager is detected
pm --verbose install
# Output: Detected package manager: yarn
#         yarn install v1.22.19
#         ...
```

## How Detection Works

The tool detects your package manager in this priority order:

1. **Lockfile detection** (highest priority):
   - `yarn.lock` → yarn
   - `package-lock.json` → npm
   - `pnpm-lock.yaml` → pnpm
   - `bun.lockb` → bun

2. **Fallback** (if no lockfile found):
   - Checks if `yarn`, `pnpm`, or `bun` command exists
   - Falls back to `npm` if none are found

3. **Caching**: Results are cached for performance

## Troubleshooting

### "Could not detect package manager"

This error occurs when you're not in a Node.js project directory. Make sure:

- You have a `package.json` file in the current directory
- Or you have a lockfile (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, or `bun.lockb`)

### Wrong package manager detected

The tool prioritizes lockfiles. If you want to switch package managers:

1. Delete the old lockfile
2. Run `pm install` to generate a new lockfile with your preferred package manager

### Command not found: pm

Make sure the package is installed globally:

```bash
npm install -g package-manager-alias-cli
```

Then verify it's in your PATH:

```bash
which pm
```

## Why Use This?

- **Consistency**: Use one command across all projects
- **Simplicity**: No need to remember which package manager each project uses
- **Speed**: Automatically uses the fastest available package manager
- **Team-friendly**: Works regardless of individual developer preferences

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes.

## License

[MIT](LICENSE) - Leo Giovanetti
