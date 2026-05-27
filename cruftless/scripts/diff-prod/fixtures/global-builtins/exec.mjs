// F-category: global builtins, microtask ordering, eval, Function ctor.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// globalThis identity.
{
  result.global_this = {
    is_object: typeof globalThis === "object",
    self_ref: globalThis === globalThis.globalThis,
    has_undefined: "undefined" in globalThis,
    has_NaN: "NaN" in globalThis,
    has_Infinity: "Infinity" in globalThis,
  };
}

// Global functions exist.
{
  result.global_fns = {
    parseInt: typeof parseInt,
    parseFloat: typeof parseFloat,
    isNaN: typeof isNaN,
    isFinite: typeof isFinite,
    encodeURIComponent: typeof encodeURIComponent,
    decodeURIComponent: typeof decodeURIComponent,
    encodeURI: typeof encodeURI,
    decodeURI: typeof decodeURI,
  };
}

// eval: basic expression.
{
  const x = eval("1 + 2");
  const y = eval("'hello'.toUpperCase()");
  result.eval_basic = { x, y };
}

// Function constructor.
{
  const add = new Function("a", "b", "return a + b");
  result.fn_ctor = {
    result: add(3, 4),
    is_function: typeof add === "function",
    length: add.length,
  };
}

// Function constructor: no args.
{
  const f = new Function("return 42");
  result.fn_ctor_no_args = f();
}

// console methods shape (core surface only).
{
  result.console_shape = {
    log: typeof console.log,
    warn: typeof console.warn,
    error: typeof console.error,
  };
}

// Microtask ordering: queueMicrotask runs before setTimeout.
{
  const order = [];
  await new Promise((resolve) => {
    setTimeout(() => { order.push("timeout"); resolve(); }, 0);
    queueMicrotask(() => { order.push("microtask"); });
    Promise.resolve().then(() => { order.push("promise"); });
  });
  result.microtask_order = order;
}

// Global constants.
{
  result.global_constants = {
    undefined_val: undefined,
    nan_is_nan: isNaN(NaN),
    inf_positive: Infinity > 0,
    neg_inf: -Infinity < 0,
  };
}

// parseInt / parseFloat edge cases.
{
  result.parse = {
    int_basic: parseInt("42"),
    int_radix: parseInt("ff", 16),
    int_leading: parseInt("  123abc"),
    int_empty: parseInt(""),
    float_basic: parseFloat("3.14"),
    float_exp: parseFloat("1e3"),
    float_leading: parseFloat("  42.5xyz"),
    float_empty: parseFloat(""),
  };
}

// isNaN vs Number.isNaN.
{
  result.isnan = {
    global_nan: isNaN(NaN),
    global_str: isNaN("hello"),
    global_undef: isNaN(undefined),
    number_nan: Number.isNaN(NaN),
    number_str: Number.isNaN("hello"),
    number_undef: Number.isNaN(undefined),
  };
}

console.log(canon(result));
