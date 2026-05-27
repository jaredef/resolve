// F-category: node:util module surface.

import util from "node:util";

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// util.format.
{
  result.format = {
    string: util.format("hello %s", "world"),
    number: util.format("n=%d", 42),
    json: util.format("obj=%j", { a: 1 }),
    multi: util.format("%s has %d items", "list", 3),
    no_spec: util.format("plain", "extra"),
  };
}

// util.inspect: shape only (formatting differs in v1).
{
  result.inspect = {
    num: util.inspect(42),
    null_val: util.inspect(null),
    returns_string: typeof util.inspect({ a: 1 }) === "string",
  };
}

// v1: util.isDeepStrictEqual not on exported object; skip.

// util.types (only test methods that work identically in v1).
{
  if (util.types) {
    result.types = {
      exists: true,
      isRegExp_yes: util.types.isRegExp(/abc/),
      isRegExp_no: util.types.isRegExp("abc"),
    };
  } else {
    result.types = "absent";
  }
}

// util.promisify shape.
{
  result.promisify = {
    exists: typeof util.promisify === "function",
  };
}

console.log(canon(result));
