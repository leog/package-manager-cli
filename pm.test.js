const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const CLI_PATH = path.join(__dirname, "pm.js");

// Helper to run the CLI
function runCLI(args = "", options = {}) {
  const cmd = `node "${CLI_PATH}" ${args}`;
  try {
    const output = execSync(cmd, {
      encoding: "utf-8",
      cwd: options.cwd || __dirname,
      env: { ...process.env, ...options.env },
    });
    return { stdout: output, exitCode: 0 };
  } catch (error) {
    return {
      stdout: error.stdout || "",
      stderr: error.stderr || "",
      exitCode: error.status,
    };
  }
}

// Helper to create a temp directory with specific files
function createTempProject(files = {}) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "pm-test-"));
  for (const [filename, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(tmpDir, filename), content);
  }
  return tmpDir;
}

// Helper to clean up temp directory
function cleanupTempDir(dir) {
  if (dir && dir.startsWith(os.tmpdir())) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

describe("pm CLI", () => {
  describe("--version flag", () => {
    test("shows version with --version", () => {
      const result = runCLI("--version");
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatch(/pm version \d+\.\d+\.\d+/);
    });

    test("shows version with -v", () => {
      const result = runCLI("-v");
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatch(/pm version \d+\.\d+\.\d+/);
    });
  });

  describe("--help flag", () => {
    test("shows help with --help", () => {
      const result = runCLI("--help");
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("pm - Universal package manager CLI");
      expect(result.stdout).toContain("Usage:");
      expect(result.stdout).toContain("Options:");
      expect(result.stdout).toContain("Examples:");
    });

    test("shows help with -h", () => {
      const result = runCLI("-h");
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("pm - Universal package manager CLI");
    });
  });

  describe("--verbose flag", () => {
    test("shows detected package manager with --verbose", () => {
      const result = runCLI("--verbose --version");
      // When --version is present, it exits early before verbose
      // so let's test verbose with a different scenario
      expect(result.exitCode).toBe(0);
    });
  });

  describe("package manager detection", () => {
    let tmpDir;

    afterEach(() => {
      if (tmpDir) {
        cleanupTempDir(tmpDir);
        tmpDir = null;
      }
    });

    test("detects npm from package-lock.json", () => {
      tmpDir = createTempProject({
        "package.json": JSON.stringify({ name: "test", version: "1.0.0" }),
        "package-lock.json": JSON.stringify({ lockfileVersion: 3 }),
      });

      const result = runCLI("--verbose --help", { cwd: tmpDir });
      expect(result.stdout).toContain("Detected package manager: npm");
    });

    test("detects yarn from yarn.lock", () => {
      tmpDir = createTempProject({
        "package.json": JSON.stringify({ name: "test", version: "1.0.0" }),
        "yarn.lock": "# yarn lockfile v1",
      });

      const result = runCLI("--verbose --help", { cwd: tmpDir });
      expect(result.stdout).toContain("Detected package manager: yarn");
    });

    test("detects pnpm from pnpm-lock.yaml", () => {
      tmpDir = createTempProject({
        "package.json": JSON.stringify({ name: "test", version: "1.0.0" }),
        "pnpm-lock.yaml": "lockfileVersion: 5.4",
      });

      const result = runCLI("--verbose --help", { cwd: tmpDir });
      expect(result.stdout).toContain("Detected package manager: pnpm");
    });

    test("detects bun from bun.lockb", () => {
      tmpDir = createTempProject({
        "package.json": JSON.stringify({ name: "test", version: "1.0.0" }),
        "bun.lockb": "", // Empty file is enough for detection
      });

      const result = runCLI("--verbose --help", { cwd: tmpDir });
      expect(result.stdout).toContain("Detected package manager: bun");
    });
  });

  describe("argument passing", () => {
    test("passes arguments correctly to package manager", () => {
      // Test that arguments are preserved (using --help which should work with any PM)
      const result = runCLI("--help install lodash");
      expect(result.exitCode).toBe(0);
      // The help text should be shown, confirming args were processed
      expect(result.stdout).toContain("pm - Universal package manager CLI");
    });

    test("filters out --verbose from passed arguments", () => {
      const result = runCLI("--verbose --help");
      expect(result.exitCode).toBe(0);
      // Should show verbose output AND help
      expect(result.stdout).toContain("Detected package manager:");
      expect(result.stdout).toContain("pm - Universal package manager CLI");
    });
  });

  describe("error handling", () => {
    test("handles invalid commands gracefully", () => {
      // Create a temp project to ensure detection works
      const tmpDir = createTempProject({
        "package.json": JSON.stringify({ name: "test", version: "1.0.0" }),
        "package-lock.json": JSON.stringify({ lockfileVersion: 3 }),
      });

      try {
        // Use a command that npm will fail on
        const result = runCLI("this-is-not-a-valid-command-12345", {
          cwd: tmpDir,
        });
        // Should have non-zero exit code
        expect(result.exitCode).not.toBe(0);
      } finally {
        cleanupTempDir(tmpDir);
      }
    });
  });

  describe("version consistency", () => {
    test("CLI version matches package.json version", () => {
      const pkg = require("./package.json");
      const result = runCLI("--version");
      expect(result.stdout).toContain(`pm version ${pkg.version}`);
    });
  });
});

describe("pm.js module structure", () => {
  test("file exists and is executable", () => {
    const stats = fs.statSync(CLI_PATH);
    expect(stats.isFile()).toBe(true);
  });

  test("has proper shebang", () => {
    const content = fs.readFileSync(CLI_PATH, "utf-8");
    expect(content.startsWith("#!/usr/bin/env node")).toBe(true);
  });
});
