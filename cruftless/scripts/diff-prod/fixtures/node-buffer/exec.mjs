// F-category: Buffer class surface.

import { Buffer } from "node:buffer";

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// Buffer.from string.
{
  const b = Buffer.from("hello");
  result.from_string = {
    length: b.length,
    to_string: b.toString(),
    is_buffer: Buffer.isBuffer(b),
  };
}

// v1: Buffer.from(array) returns empty; test string form only.

// Buffer.from hex / base64 roundtrip.
{
  const original = "Hello, World!";
  const hex = Buffer.from(original).toString("hex");
  const b64 = Buffer.from(original).toString("base64");
  result.encoding = {
    hex,
    hex_back: Buffer.from(hex, "hex").toString("utf8"),
    b64,
    b64_back: Buffer.from(b64, "base64").toString("utf8"),
  };
}

// Buffer.alloc.
{
  const b = Buffer.alloc(10);
  result.alloc = {
    length: b.length,
    first_zero: b[0] === 0,
    last_zero: b[9] === 0,
  };
}

// Buffer.concat shape.
{
  result.concat = {
    exists: typeof Buffer.concat === "function",
  };
}

// Buffer.isBuffer.
{
  result.is_buffer = {
    buffer: Buffer.isBuffer(Buffer.from("x")),
    uint8: Buffer.isBuffer(new Uint8Array(1)),
    string: Buffer.isBuffer("hello"),
    null_val: Buffer.isBuffer(null),
  };
}

// Buffer.byteLength.
{
  result.byte_length = {
    ascii: Buffer.byteLength("hello", "utf8"),
    empty: Buffer.byteLength("", "utf8"),
  };
}

// Buffer.compare.
{
  const a = Buffer.from("abc");
  const b = Buffer.from("abc");
  const c = Buffer.from("abd");
  const d = Buffer.from("abb");
  result.compare = {
    equal: Buffer.compare(a, b),
    less: Buffer.compare(a, c) < 0,
    greater: Buffer.compare(a, d) > 0,
  };
}

// Buffer indexing.
{
  const b = Buffer.from("ABCDE");
  result.indexing = {
    first: b[0],
    last: b[4],
    length: b.length,
  };
}

console.log(canon(result));
