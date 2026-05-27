// F-category: optional chaining, nullish coalescing, logical assignment.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// Optional chaining: property access.
{
  const o = { a: { b: { c: 42 } } };
  result.chain_prop = {
    deep: o?.a?.b?.c,
    miss: o?.x?.y?.z,
    null_base: null?.foo,
    undef_base: undefined?.foo,
  };
}

// Optional chaining: bracket access.
{
  const o = { items: [10, 20, 30] };
  result.chain_bracket = {
    hit: o?.items?.[1],
    miss_arr: o?.missing?.[0],
    null_bracket: null?.[0],
  };
}

// Optional chaining: method call.
{
  const o = { greet(name) { return `hi ${name}`; } };
  result.chain_call = {
    hit: o?.greet?.("world"),
    miss: o?.missing?.("x"),
    null_call: null?.toString?.(),
  };
}

// Short-circuit: side effects should not fire past null.
{
  let count = 0;
  const inc = () => { count++; return { v: 1 }; };
  const x = null?.foo;
  const y = undefined?.[inc()];
  result.short_circuit = { count, x, y };
}

// Nullish coalescing.
{
  result.nullish = {
    null_case: null ?? "default",
    undef_case: undefined ?? "default",
    zero: 0 ?? "default",
    empty: "" ?? "default",
    false_val: false ?? "default",
    nan_val: NaN ?? "default",
    chain: null ?? undefined ?? "found",
  };
}

// Logical assignment: ||=
{
  let a = 0; a ||= 5;
  let b = 1; b ||= 5;
  let c = ""; c ||= "fallback";
  let d = "keep"; d ||= "fallback";
  result.or_assign = { a, b, c, d };
}

// Logical assignment: &&=
{
  let a = 0; a &&= 5;
  let b = 1; b &&= 5;
  let c = ""; c &&= "replaced";
  let d = "truthy"; d &&= "replaced";
  result.and_assign = { a, b, c, d };
}

// Logical assignment: ??=
{
  let a = null; a ??= "filled";
  let b = undefined; b ??= "filled";
  let c = 0; c ??= "not-filled";
  let d = ""; d ??= "not-filled";
  let e = false; e ??= "not-filled";
  result.nullish_assign = { a, b, c, d, e };
}

// Combined: optional chain + nullish coalescing.
{
  const o = { a: { b: null } };
  result.combined = {
    chain_null: o?.a?.b ?? "was-null",
    chain_miss: o?.x?.y ?? "was-missing",
    deep_zero: { a: { b: 0 } }?.a?.b ?? "fallback",
  };
}

console.log(canon(result));
