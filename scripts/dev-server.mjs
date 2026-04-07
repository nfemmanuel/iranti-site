import { execFileSync, spawn } from "node:child_process";
import path from "node:path";

const repoRoot = process.cwd();

function getProcessRows() {
  try {
    if (process.platform === "win32") {
      const script = [
        "Get-CimInstance Win32_Process",
        "| Where-Object { $_.Name -eq 'node.exe' }",
        "| Select-Object ProcessId, CommandLine",
        "| ConvertTo-Json -Compress",
      ].join(" ");
      const raw = execFileSync(
        "powershell.exe",
        ["-NoProfile", "-Command", script],
        { cwd: repoRoot, encoding: "utf8" },
      ).trim();
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    }

    const raw = execFileSync(
      "ps",
      ["-axo", "pid=,command="],
      { cwd: repoRoot, encoding: "utf8" },
    );
    return raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const firstSpace = line.indexOf(" ");
        return {
          ProcessId: Number(line.slice(0, firstSpace)),
          CommandLine: line.slice(firstSpace + 1),
        };
      });
  } catch {
    return [];
  }
}

function isRepoNextDevProcess(row) {
  if (!row || typeof row.CommandLine !== "string") return false;
  const command = row.CommandLine.toLowerCase();
  const normalizedRoot = repoRoot.toLowerCase();
  return (
    row.ProcessId !== process.pid &&
    command.includes(normalizedRoot) &&
    command.includes("next") &&
    command.includes(" dev")
  );
}

const running = getProcessRows().filter(isRepoNextDevProcess);

if (running.length > 0) {
  const details = running
    .map((row) => `PID ${row.ProcessId}: ${row.CommandLine}`)
    .join("\n");
  console.error(
    [
      "Another iranti-site dev server is already running.",
      "Starting a second `next dev` against the same `.next` directory can corrupt server chunks on Windows.",
      "Stop the existing process or use the current dev server instead.",
      details,
    ].join("\n"),
  );
  process.exit(1);
}

const nextBin = path.join(repoRoot, "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextBin, "dev"], {
  cwd: repoRoot,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
