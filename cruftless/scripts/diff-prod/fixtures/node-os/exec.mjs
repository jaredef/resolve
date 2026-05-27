// F-category: node:os module surface.

import os from "node:os";

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// os.platform / arch / type.
{
  result.identity = {
    platform_type: typeof os.platform(),
    arch_type: typeof os.arch(),
    type_type: typeof os.type(),
  };
}

// os.cpus shape.
{
  const cpus = os.cpus();
  result.cpus = {
    is_array: Array.isArray(cpus),
    has_entries: cpus.length > 0,
    first_has_model: typeof cpus[0]?.model === "string",
  };
}

// os.homedir / tmpdir.
{
  result.dirs = {
    homedir_type: typeof os.homedir(),
    homedir_nonempty: os.homedir().length > 0,
    tmpdir_type: typeof os.tmpdir(),
    tmpdir_nonempty: os.tmpdir().length > 0,
  };
}

// os.EOL.
{
  result.eol = {
    type: typeof os.EOL,
    is_newline: os.EOL === "\n" || os.EOL === "\r\n",
  };
}

// os.endianness.
{
  result.endianness = {
    val: os.endianness(),
    valid: os.endianness() === "BE" || os.endianness() === "LE",
  };
}

// os.totalmem / freemem.
{
  result.memory = {
    total_type: typeof os.totalmem(),
    free_type: typeof os.freemem(),
    total_positive: os.totalmem() > 0,
    free_positive: os.freemem() >= 0,
  };
}

// os.uptime.
{
  result.uptime = {
    type: typeof os.uptime(),
    positive: os.uptime() >= 0,
  };
}

// os.hostname.
{
  result.hostname = {
    type: typeof os.hostname(),
    nonempty: os.hostname().length > 0,
  };
}

console.log(canon(result));
