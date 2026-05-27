// F-category: typeof, coercion, equality edge cases.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// typeof for all spec types.
{
  result.typeof_all = {
    number: typeof 42,
    string: typeof "hello",
    boolean: typeof true,
    undefined: typeof undefined,
    null_val: typeof null,
    object: typeof {},
    array: typeof [],
    function: typeof function(){},
    symbol: typeof Symbol("s"),
    bigint: typeof 42n,
  };
}

// Object.is edge cases.
{
  result.object_is = {
    pos_neg_zero: Object.is(0, -0),
    neg_neg_zero: Object.is(-0, -0),
    nan_nan: Object.is(NaN, NaN),
    null_null: Object.is(null, null),
    undef_undef: Object.is(undefined, undefined),
    null_undef: Object.is(null, undefined),
    same_ref: (() => { const o = {}; return Object.is(o, o); })(),
    diff_ref: Object.is({}, {}),
  };
}

// Loose equality (==) edge cases.
{
  result.loose_eq = {
    null_undef: null == undefined,
    undef_null: undefined == null,
    null_zero: null == 0,
    undef_zero: undefined == 0,
    zero_false: 0 == false,
    one_true: 1 == true,
    empty_zero: "" == 0,
    str_num: "42" == 42,
    null_false: null == false,
    nan_nan: NaN == NaN,
  };
}

// ToPrimitive: valueOf.
{
  const obj = { valueOf() { return 10; }, toString() { return "str"; } };
  result.to_primitive_valueof = {
    plus: obj + 5,
    mul: obj * 2,
    str_concat: "" + obj,
  };
}

// ToPrimitive: toString (hint: string).
{
  const obj = { toString() { return "custom"; } };
  result.to_primitive_tostring = {
    template: `${obj}`,
    concat: "pre-" + obj,
  };
}

// Unary operators.
{
  result.unary = {
    plus_str: +"42",
    plus_bool: +true,
    plus_null: +null,
    plus_undef: +undefined,
    neg: -5,
    neg_str: -"3",
    not_truthy: !1,
    not_falsy: !0,
    not_null: !null,
    double_not: !!42,
    bitwise_not: ~0,
    bitwise_not_neg: ~-1,
    void_val: void 42,
    void_type: typeof void 0,
  };
}

// Boolean coercion.
{
  result.bool_coerce = {
    zero: Boolean(0),
    neg_zero: Boolean(-0),
    empty: Boolean(""),
    null_v: Boolean(null),
    undef: Boolean(undefined),
    nan: Boolean(NaN),
    false_v: Boolean(false),
    one: Boolean(1),
    str: Boolean("x"),
    obj: Boolean({}),
    arr: Boolean([]),
    fn: Boolean(function(){}),
  };
}

// Number coercion edge cases.
{
  result.number_coerce = {
    null_v: Number(null),
    undef: Number(undefined),
    true_v: Number(true),
    false_v: Number(false),
    empty_str: Number(""),
    space_str: Number("  "),
    hex: Number("0xff"),
    invalid: Number("abc"),
    empty_arr: Number([]),
    single_arr: Number([5]),
  };
}

// String coercion.
{
  result.string_coerce = {
    null_v: String(null),
    undef: String(undefined),
    true_v: String(true),
    num: String(42),
    neg_zero: String(-0),
    inf: String(Infinity),
    nan: String(NaN),
    // v1: Symbol.toString returns internal repr; skip.
  };
}

console.log(canon(result));
