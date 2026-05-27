// F-category: node:assert module surface.

import assert from "node:assert";

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

function doesThrow(fn) {
  try { fn(); return false; } catch { return true; }
}

const result = {};

// assert.ok.
{
  result.ok = {
    truthy: !doesThrow(() => assert.ok(1)),
    falsy: doesThrow(() => assert.ok(0)),
    true_val: !doesThrow(() => assert.ok(true)),
    false_val: doesThrow(() => assert.ok(false)),
    null_val: doesThrow(() => assert.ok(null)),
    string: !doesThrow(() => assert.ok("yes")),
    empty: doesThrow(() => assert.ok("")),
  };
}

// assert.equal / assert.strictEqual.
{
  result.equal = {
    loose_same: !doesThrow(() => assert.equal(1, 1)),
    strict_same: !doesThrow(() => assert.strictEqual(1, 1)),
    strict_coerce: doesThrow(() => assert.strictEqual(1, "1")),
  };
}

// assert.notEqual / notStrictEqual.
{
  result.not_equal = {
    loose_diff: !doesThrow(() => assert.notEqual(1, 2)),
    loose_same: doesThrow(() => assert.notEqual(1, 1)),
    strict_coerce: !doesThrow(() => assert.notStrictEqual(1, "1")),
    strict_same: doesThrow(() => assert.notStrictEqual(1, 1)),
  };
}

// assert.deepStrictEqual.
{
  result.deep_strict = {
    same_obj: !doesThrow(() => assert.deepStrictEqual({ a: 1 }, { a: 1 })),
    diff_obj: doesThrow(() => assert.deepStrictEqual({ a: 1 }, { a: 2 })),
    nested: !doesThrow(() => assert.deepStrictEqual({ a: { b: [1] } }, { a: { b: [1] } })),
    diff_nested: doesThrow(() => assert.deepStrictEqual({ a: { b: 1 } }, { a: { b: 2 } })),
    arrays: !doesThrow(() => assert.deepStrictEqual([1, 2], [1, 2])),
    diff_arr: doesThrow(() => assert.deepStrictEqual([1, 2], [1, 3])),
  };
}

// assert.throws.
{
  result.throws = {
    no_throw: doesThrow(() => assert.throws(() => {})),
  };
}

// assert.doesNotThrow shape.
{
  result.does_not_throw = {
    exists: typeof assert.doesNotThrow === "function",
  };
}

// assert.fail.
{
  result.fail = {
    always_throws: doesThrow(() => assert.fail("forced")),
  };
}

// assert module shape.
{
  result.shape = {
    has_ok: typeof assert.ok === "function",
    has_equal: typeof assert.equal === "function",
    has_strict: typeof assert.strictEqual === "function",
    has_deep: typeof assert.deepStrictEqual === "function",
    has_throws: typeof assert.throws === "function",
    has_fail: typeof assert.fail === "function",
  };
}

console.log(canon(result));
