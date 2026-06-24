import { rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();
const PORT = 3001;

function freePortOnWindows(port) {
  if (process.platform !== "win32") return;

  try {
    const output = execSync(`netstat -ano | findstr ":${port}"`, { encoding: "utf8" });
    const pids = new Set(
      output
        .split("\n")
        .map((line) => line.trim().split(/\s+/).pop())
        .filter((pid) => pid && /^\d+$/.test(pid) && pid !== "0")
    );

    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        console.log(`Stopped process ${pid} on port ${port}`);
      } catch {
        // Process may already be gone
      }
    }
  } catch {
    // Port not in use
  }
}

function removeDir(path) {
  if (!existsSync(path)) return;
  try {
    rmSync(path, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
    console.log(`Removed: ${path}`);
  } catch (error) {
    console.warn(`Could not remove ${path}:`, error.message);
    console.warn("Close all npm run dev terminals, then run: npm run dev:clean");
  }
}

console.log(`Freeing port ${PORT}...`);
freePortOnWindows(PORT);

removeDir(join(root, ".next"));
removeDir(join(root, "node_modules", ".cache"));

console.log("Dev cache reset complete. Run: npm run dev");
