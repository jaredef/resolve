// F-category: spread, rest, default parameters.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// Rest parameters.
{
  function sum(first, ...rest) {
    return { first, rest, total: [first, ...rest].reduce((a, b) => a + b, 0) };
  }
  result.rest_params = {
    multi: sum(1, 2, 3, 4),
    single: sum(10),
    none: sum(),
  };
}

// Default parameters.
{
  function greet(name = "world", punct = "!") {
    return `hello ${name}${punct}`;
  }
  result.defaults = {
    both: greet("alice", "."),
    one: greet("bob"),
    none: greet(),
    undef_triggers: greet(undefined, "?"),
    null_keeps: greet(null, "!"),
  };
}

// Default parameter expressions (evaluated at call time).
{
  let counter = 0;
  function f(x = ++counter) { return x; }
  f(10);
  f();
  f();
  result.default_expr = { counter };
}

// Default referencing earlier params.
{
  function f(a, b = a * 2) { return { a, b }; }
  result.default_chain = { full: f(3, 7), partial: f(5) };
}

// Spread in arrays.
{
  const a = [1, 2, 3];
  const b = [0, ...a, 4, 5];
  const c = [...a, ...a];
  result.spread_array = { b, c, empty: [...[]] };
}

// Spread in objects.
{
  const base = { a: 1, b: 2 };
  const ext = { ...base, c: 3 };
  const override = { ...base, b: 99, d: 4 };
  const nested = { ...{ x: 1 }, ...{ y: 2 }, ...{ x: 3 } };
  result.spread_obj = { ext, override, nested, empty: { ...{} } };
}

// Spread in function call.
{
  function add(a, b, c) { return a + b + c; }
  const args = [10, 20, 30];
  result.spread_call = add(...args);
}

// Rest in array destructuring.
{
  const [first, second, ...rest] = [1, 2, 3, 4, 5];
  result.rest_destruct_arr = { first, second, rest };
}

// Rest in object destructuring.
{
  const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
  result.rest_destruct_obj = { a, b, rest_keys: Object.keys(rest).sort() };
}

// Arguments object in regular function.
{
  function f() {
    return {
      len: arguments.length,
      zero: arguments[0],
      spread: [...arguments],
    };
  }
  result.arguments_obj = f("x", "y", "z");
}

// Spread with strings (iterable).
{
  result.spread_string = [..."abc"];
}

// Spread with Set.
{
  result.spread_set = [...new Set([3, 1, 2, 1, 3])];
}

// Spread with Map.
{
  const m = new Map([["a", 1], ["b", 2]]);
  result.spread_map = [...m];
}

// Nested destructuring with defaults + rest.
{
  const { x: { a = 10, b }, ...outer } = { x: { b: 20 }, y: 30 };
  result.nested_destruct = { a, b, outer_keys: Object.keys(outer).sort() };
}

console.log(canon(result));
