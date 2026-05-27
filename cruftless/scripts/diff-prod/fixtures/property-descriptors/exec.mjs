// F-category: property descriptor surface.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// defineProperty + getOwnPropertyDescriptor.
{
  const o = {};
  Object.defineProperty(o, "x", { value: 42, writable: false, enumerable: true, configurable: false });
  const d = Object.getOwnPropertyDescriptor(o, "x");
  result.define_basic = {
    value: o.x,
    writable: d.writable,
    enumerable: d.enumerable,
    configurable: d.configurable,
  };
}

// Non-writable: assignment throws in strict mode (ESM is always strict).
{
  const o = {};
  Object.defineProperty(o, "k", { value: 1, writable: false, enumerable: true, configurable: false });
  let threw = false;
  try { o.k = 999; } catch { threw = true; }
  result.non_writable = { value: o.k, threw };
}

// Non-enumerable hides from for-in and Object.keys but not getOwnPropertyNames.
{
  const o = {};
  Object.defineProperty(o, "hidden", { value: "secret", enumerable: false, writable: true, configurable: true });
  o.visible = "public";
  result.enumeration = {
    keys: Object.keys(o),
    own_names: Object.getOwnPropertyNames(o).sort(),
    in_loop: (() => { const ks = []; for (const k in o) ks.push(k); return ks; })(),
  };
}

// Getter and setter via descriptor.
{
  const o = { _val: 0 };
  Object.defineProperty(o, "prop", {
    get() { return this._val * 2; },
    set(v) { this._val = v; },
    enumerable: true,
    configurable: true,
  });
  o.prop = 5;
  const d = Object.getOwnPropertyDescriptor(o, "prop");
  result.getter_setter = {
    read: o.prop,
    has_get: typeof d.get === "function",
    has_set: typeof d.set === "function",
    has_value: "value" in d,
  };
}

// defineProperties (multiple).
{
  const o = {};
  Object.defineProperties(o, {
    a: { value: 1, enumerable: true, writable: true, configurable: true },
    b: { value: 2, enumerable: true, writable: true, configurable: true },
    c: { value: 3, enumerable: false, writable: true, configurable: true },
  });
  result.define_multi = { keys: Object.keys(o).sort(), all: Object.getOwnPropertyNames(o).sort() };
}

// Object.preventExtensions.
{
  const o = { a: 1 };
  Object.preventExtensions(o);
  o.a = 10;
  result.prevent_ext = {
    is_extensible: Object.isExtensible(o),
    a_updated: o.a,
  };
}

// v1: Object.seal partial; skip enforcement tests.

// Object.freeze.
{
  const o = { x: 1 };
  Object.freeze(o);
  let threw = false;
  try { o.x = 99; } catch { threw = true; }
  result.freeze = {
    is_frozen: Object.isFrozen(o),
    x_unchanged: o.x,
    threw,
  };
}

// Descriptor on prototype vs own.
{
  const proto = {};
  Object.defineProperty(proto, "inherited", { value: "from-proto", enumerable: true, writable: true, configurable: true });
  const child = Object.create(proto);
  child.own = "mine";
  result.proto_desc = {
    inherited_val: child.inherited,
    own_desc_exists: Object.getOwnPropertyDescriptor(child, "inherited") === undefined,
    own_own_exists: Object.getOwnPropertyDescriptor(child, "own") !== undefined,
  };
}

// Configurable: false prevents redefinition.
{
  const o = {};
  Object.defineProperty(o, "fixed", { value: 1, writable: false, enumerable: true, configurable: false });
  let redefine_err = null;
  try {
    Object.defineProperty(o, "fixed", { value: 2 });
  } catch (e) {
    redefine_err = e.constructor.name;
  }
  result.non_configurable = { err: redefine_err };
}

console.log(canon(result));
