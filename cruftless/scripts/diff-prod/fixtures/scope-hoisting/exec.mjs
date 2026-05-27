// F-category: scoping, hoisting, closures in loops.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// var hoisting: declaration hoisted, initialization not.
{
  const before = typeof hoisted_var;
  var hoisted_var = 42;
  result.var_hoist = { before, after: hoisted_var };
}

// Function declaration (called after definition).
{
  function declared_fn() { return "declared"; }
  result.fn_decl = declared_fn();
}

// Block scoping: let in block.
{
  let x = "outer";
  {
    let x = "inner";
  }
  result.block_let = x;
}

// Block scoping: const in block.
{
  const x = "outer";
  {
    const x = "inner";
  }
  result.block_const = x;
}

// var leaks out of block.
{
  {
    var leaked = "i leaked";
  }
  result.var_leaks = leaked;
}

// Closure captures by reference.
{
  let x = 1;
  const f = () => x;
  x = 2;
  result.closure_ref = f();
}

// Closures in for loop with let (per-iteration binding).
{
  const fns = [];
  for (let i = 0; i < 5; i++) {
    fns.push(() => i);
  }
  result.closure_let_loop = fns.map((f) => f());
}

// Closures in for loop with var (shared binding).
{
  const fns = [];
  for (var i = 0; i < 5; i++) {
    fns.push(() => i);
  }
  result.closure_var_loop = fns.map((f) => f());
}

// IIFE.
{
  const val = (function(x) { return x * 2; })(21);
  result.iife = val;
}

// IIFE with arrow.
{
  const val = ((x) => x * 3)(10);
  result.iife_arrow = val;
}

// Nested function scopes.
{
  function outer() {
    const a = 1;
    function middle() {
      const b = 2;
      function inner() {
        const c = 3;
        return a + b + c;
      }
      return inner();
    }
    return middle();
  }
  result.nested_scope = outer();
}

// Function name binding: named function expression.
{
  const f = function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
  };
  result.named_expr = {
    result: f(5),
    name: f.name,
    outer_visible: typeof factorial === "undefined",
  };
}

// arguments and rest coexist.
{
  function f(a, ...rest) {
    return { args_len: arguments.length, rest_len: rest.length, first_arg: arguments[0] };
  }
  result.args_rest = f(1, 2, 3);
}

// Shadowing across scopes.
{
  const x = "global";
  function f() {
    const x = "function";
    return x;
  }
  result.shadow = { outer: x, inner: f() };
}

// for-of with const.
{
  const collected = [];
  for (const item of [10, 20, 30]) {
    collected.push(item);
  }
  result.for_of_const = { collected };
}

console.log(canon(result));
