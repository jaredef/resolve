// F-category: process global surface.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// process exists as a global.
{
  result.process_shape = {
    is_object: typeof process === "object",
    has_argv: Array.isArray(process.argv),
    has_env: typeof process.env === "object",
    has_cwd: typeof process.cwd === "function",
    has_exit: typeof process.exit === "function",
  };
}

// process.pid.
{
  result.pid = {
    pid_type: typeof process.pid,
    pid_positive: process.pid > 0,
  };
}

// process.platform / arch.
{
  result.platform_arch = {
    platform_type: typeof process.platform,
    arch_type: typeof process.arch,
    platform_string: typeof process.platform === "string",
    arch_string: typeof process.arch === "string",
  };
}

// process.version.
{
  result.version = {
    type: typeof process.version,
    starts_v: typeof process.version === "string" && process.version.startsWith("v"),
    versions_type: typeof process.versions,
  };
}

// process.cwd().
{
  const cwd = process.cwd();
  result.cwd = {
    type: typeof cwd,
    is_string: typeof cwd === "string",
    not_empty: cwd.length > 0,
  };
}

// process.env shape.
{
  result.env = {
    type: typeof process.env,
    is_object: typeof process.env === "object",
    path_exists: typeof process.env.PATH === "string" || typeof process.env.PATH === "undefined",
  };
}

// process.stdout / stderr shape.
{
  result.stdio = {
    stdout_type: typeof process.stdout,
    stderr_type: typeof process.stderr,
    stdout_write: typeof process.stdout?.write,
    stderr_write: typeof process.stderr?.write,
  };
}

// process.nextTick.
{
  const order = [];
  await new Promise((resolve) => {
    if (typeof process.nextTick === "function") {
      process.nextTick(() => { order.push("nextTick"); });
    }
    queueMicrotask(() => { order.push("microtask"); });
    Promise.resolve().then(() => { order.push("promise"); resolve(); });
  });
  result.next_tick = order;
}

console.log(canon(result));
