// F-category: WeakRef, FinalizationRegistry, Error.isError, Error cause.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// WeakRef: basic creation and deref.
{
  const target = { id: 42 };
  const ref = new WeakRef(target);
  const derefed = ref.deref();
  result.weakref_basic = {
    deref_same: derefed === target,
    deref_id: derefed.id,
    is_weakref: ref instanceof WeakRef,
  };
}

// FinalizationRegistry: construction and shape.
{
  const fr = new FinalizationRegistry(() => {});
  result.finreg = {
    is_instance: fr instanceof FinalizationRegistry,
    has_register: typeof fr.register === "function",
    has_unregister: typeof fr.unregister === "function",
  };
}

// FinalizationRegistry: register returns undefined.
{
  const fr = new FinalizationRegistry(() => {});
  const target = {};
  const ret = fr.register(target, "held-value");
  result.finreg_register = { returned: ret };
}

// Error.isError (ES2025).
{
  if (typeof Error.isError === "function") {
    result.is_error = {
      error: Error.isError(new Error("x")),
      type_error: Error.isError(new TypeError("y")),
      plain_obj: Error.isError({ message: "fake" }),
      null_safe: Error.isError(null),
      undef_safe: Error.isError(undefined),
    };
  } else {
    result.is_error = "absent";
  }
}

// Error cause chaining.
{
  const inner = new Error("root");
  const mid = new Error("mid", { cause: inner });
  const outer = new Error("outer", { cause: mid });
  result.cause_chain = {
    outer_msg: outer.message,
    mid_msg: outer.cause.message,
    root_msg: outer.cause.cause.message,
  };
}

console.log(canon(result));
