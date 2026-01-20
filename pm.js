#!/usr/bin/env node

const { execSync } = require("child_process");
const { detect } = require("detect-package-manager");
const { version } = require("./package.json");

const args = process.argv.slice(2);

const HELP_TEXT = `
pm - Universal package manager CLI

Usage: pm [options] [command] [args...]

Options:
  -v, --version   Show version number
  -h, --help      Show this help message
  --verbose       Show which package manager is being used

Commands:
  Any command supported by your package manager (install, add, remove, etc.)

Examples:
  pm install           Install dependencies
  pm add lodash        Add a package
  pm remove lodash     Remove a package
  pm run build         Run a script
  pm --verbose install Show detected package manager and install

Detection Priority:
  1. yarn.lock      -> yarn
  2. package-lock.json -> npm
  3. pnpm-lock.yaml -> pnpm
  4. bun.lockb      -> bun
  5. Fallback: checks if yarn/pnpm/bun exists, otherwise npm
`;

async function main() {
  // Handle --version / -v (exits immediately)
  if (args.includes("--version") || args.includes("-v")) {
    console.log(`pm version ${version}`);
    process.exit(0);
  }

  // Check for --verbose flag early
  const verbose = args.includes("--verbose");
  const showHelp = args.includes("--help") || args.includes("-h");

  // Filter out our flags from args passed to package manager
  const filteredArgs = args.filter(
    (arg) => !["--verbose", "--help", "-h"].includes(arg)
  );
  const argsString = filteredArgs.join(" ");

  // If verbose is set, detect and show PM first (even if --help is also set)
  let pm;
  if (verbose || !showHelp) {
    try {
      pm = await detect();
    } catch (error) {
      if (!showHelp) {
        console.error(
          "Could not detect package manager. Make sure you are in a Node.js project directory."
        );
        console.error(
          "Hint: Create a package.json or lockfile (package-lock.json, yarn.lock, pnpm-lock.yaml, or bun.lockb)"
        );
        process.exit(1);
      }
    }

    if (verbose && pm) {
      console.log(`Detected package manager: ${pm}`);
    }
  }

  // Handle --help / -h
  if (showHelp) {
    console.log(HELP_TEXT);
    process.exit(0);
  }

  try {
    execSync(`${pm} ${argsString}`, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to execute command: ${pm} ${argsString}`);
    process.exit(1);
  }
}

main();
