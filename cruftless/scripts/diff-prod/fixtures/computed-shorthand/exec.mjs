// F-category: computed properties, shorthand, Symbol keys, literal accessors.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// Computed property names.
{
  const key = "dynamic";
  const idx = 2;
  const o = { [key]: 1, [`key_${idx}`]: 2, [1 + 2]: 3 };
  result.computed = { keys: Object.keys(o).sort(), vals: [o.dynamic, o.key_2, o[3]] };
}

// Shorthand properties.
{
  const name = "alice";
  const age = 30;
  const o = { name, age };
  result.shorthand_props = o;
}

// Shorthand methods.
{
  const o = {
    greet(name) { return `hi ${name}`; },
    get x() { return 42; },
  };
  result.shorthand_method = {
    call: o.greet("bob"),
    getter: o.x,
  };
}

// Getter and setter in object literal.
{
  const o = {
    _v: 0,
    get val() { return this._v; },
    set val(x) { this._v = x * 2; },
  };
  o.val = 5;
  result.literal_accessor = { read: o.val, internal: o._v };
}

// Symbol as property key.
{
  const s = Symbol("mykey");
  const o = { [s]: "sym-val", regular: "reg" };
  result.symbol_key = {
    has_sym: o[s] === "sym-val",
    keys_excludes: Object.keys(o),
    own_syms: Object.getOwnPropertySymbols(o).length,
  };
}

// Well-known Symbol: Symbol.iterator.
{
  const range = {
    from: 1,
    to: 4,
    [Symbol.iterator]() {
      let cur = this.from;
      const to = this.to;
      return {
        next() {
          return cur <= to ? { value: cur++, done: false } : { done: true };
        },
      };
    },
  };
  result.well_known_iterator = [...range];
}

// Computed method name.
{
  const method = "doIt";
  const o = { [method](x) { return x + 1; } };
  result.computed_method = o.doIt(10);
}

// Property spread order (later wins).
{
  const a = { x: 1, y: 2 };
  const b = { y: 3, z: 4 };
  const merged = { ...a, ...b };
  result.spread_order = merged;
}

// __proto__ in literal (sets prototype).
{
  const proto = { hello() { return "from proto"; } };
  const o = { __proto__: proto, own: true };
  result.proto_literal = {
    has_own: o.own,
    proto_method: o.hello(),
    proto_is: Object.getPrototypeOf(o) === proto,
  };
}

console.log(canon(result));
