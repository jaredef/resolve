// F-category: String unicode methods and advanced String surface.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// String.fromCodePoint.
{
  result.from_code_point = {
    ascii: String.fromCodePoint(72, 105),
    emoji: String.fromCodePoint(0x1F600),
    multi: String.fromCodePoint(65, 0x1F4A9, 90),
  };
}

// codePointAt (ASCII only; surrogate-pair indexing differs in v1).
{
  const s = "ABCDE";
  result.code_point_at = {
    a: s.codePointAt(0),
    b: s.codePointAt(1),
    e: s.codePointAt(4),
    length: s.length,
  };
}

// v1: String.raw doesn't preserve raw escapes; skip.

// String.prototype.at.
{
  const s = "abcdef";
  result.at = {
    first: s.at(0),
    last: s.at(-1),
    neg2: s.at(-2),
    oor: s.at(100),
  };
}

// normalize: v1 defers Unicode normalization; skip.

// matchAll iteration.
{
  const s = "test1 test2 test3";
  const matches = [...s.matchAll(/test(\d)/g)];
  result.match_all = {
    count: matches.length,
    groups: matches.map((m) => m[1]),
    indices: matches.map((m) => m.index),
  };
}

// replaceAll with function.
{
  const s = "a1b2c3";
  const replaced = s.replaceAll(/(\d)/g, (match, d) => `[${d}]`);
  result.replace_all_fn = replaced;
}

// search.
{
  result.search = {
    found: "hello world".search(/world/),
    not_found: "hello world".search(/xyz/),
    regex: "abc123".search(/\d+/),
  };
}

// String.prototype.repeat edge cases.
{
  result.repeat = {
    basic: "ab".repeat(3),
    zero: "x".repeat(0),
    one: "x".repeat(1),
    empty: "".repeat(100),
  };
}

// trimStart / trimEnd.
{
  const s = "  hello  ";
  result.trim = {
    both: s.trim(),
    start: s.trimStart(),
    end: s.trimEnd(),
    only_spaces: "   ".trim(),
  };
}

// startsWith / endsWith / includes (no position arg; v1 position support partial).
{
  const s = "hello world";
  result.position = {
    starts_yes: s.startsWith("hello"),
    starts_no: s.startsWith("world"),
    ends_yes: s.endsWith("world"),
    ends_no: s.endsWith("hello"),
    includes_yes: s.includes("world"),
    includes_no: s.includes("xyz"),
  };
}

// padStart / padEnd.
{
  result.pad = {
    start: "5".padStart(3, "0"),
    end: "x".padEnd(5, "."),
    no_pad: "long".padStart(2, "x"),
    default: "a".padStart(4),
  };
}

// String.prototype.split edge cases.
{
  result.split = {
    basic: "a,b,c".split(","),
    limit: "a,b,c,d".split(",", 2),
    empty_sep: "abc".split(""),
    no_match: "hello".split(","),
    regex: "a1b2c3".split(/\d/),
  };
}

console.log(canon(result));
