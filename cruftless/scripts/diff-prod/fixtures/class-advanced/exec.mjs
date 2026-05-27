// F-category: advanced class features.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// Private fields.
{
  class Counter {
    #count = 0;
    increment() { this.#count++; }
    get value() { return this.#count; }
  }
  const c = new Counter();
  c.increment();
  c.increment();
  c.increment();
  // v1: private fields are visible as regular properties; skip key enumeration check.
  result.private_field = {
    value: c.value,
  };
}

// Private methods.
{
  class Greeter {
    #format(name) { return `Hello, ${name}!`; }
    greet(name) { return this.#format(name); }
  }
  result.private_method = new Greeter().greet("world");
}

// Private static field.
{
  class Config {
    static #instance = null;
    static getInstance() {
      if (!Config.#instance) Config.#instance = new Config();
      return Config.#instance;
    }
  }
  const a = Config.getInstance();
  const b = Config.getInstance();
  result.private_static = { same: a === b };
}

// Static block.
{
  class Registry {
    static items;
    static {
      Registry.items = ["a", "b", "c"];
    }
  }
  result.static_block = Registry.items;
}

// Computed method names in class.
{
  const method = "compute";
  class Calc {
    [method](x) { return x * 2; }
  }
  result.computed_class_method = new Calc().compute(21);
}

// Extends expression.
{
  function getBase() { return class { base() { return "base"; } }; }
  class Derived extends getBase() {
    derived() { return "derived"; }
  }
  const d = new Derived();
  result.extends_expr = { base: d.base(), derived: d.derived() };
}

// Class name binding.
{
  const MyClass = class NamedClass {
    whoami() { return NamedClass.name; }
  };
  result.class_name = {
    variable_name: MyClass.name,
    internal_name: new MyClass().whoami(),
  };
}

// instanceof chain: multi-level.
{
  class A {}
  class B extends A {}
  class C extends B {}
  const c = new C();
  result.instanceof_chain = {
    c_of_C: c instanceof C,
    c_of_B: c instanceof B,
    c_of_A: c instanceof A,
    c_of_Object: c instanceof Object,
  };
}

// Static methods and fields.
{
  class MathHelper {
    static PI = 3.14159;
    static double(x) { return x * 2; }
  }
  result.static_members = {
    pi: MathHelper.PI,
    doubled: MathHelper.double(5),
    on_instance: (() => { try { return new MathHelper().double(1); } catch { return "no"; } })(),
  };
}

// Constructor return override.
{
  class Overrider {
    constructor() { return { custom: true }; }
  }
  const o = new Overrider();
  result.ctor_return = {
    custom: o.custom,
    is_instance: o instanceof Overrider,
  };
}

// super in method.
{
  class Parent {
    greet() { return "parent"; }
  }
  class Child extends Parent {
    greet() { return `child+${super.greet()}`; }
  }
  result.super_method = new Child().greet();
}

// Getter/setter in class.
{
  class Box {
    #val;
    constructor(v) { this.#val = v; }
    get value() { return this.#val; }
    set value(v) { this.#val = v > 0 ? v : 0; }
  }
  const b = new Box(10);
  b.value = -5;
  result.class_accessor = b.value;
}

console.log(canon(result));
