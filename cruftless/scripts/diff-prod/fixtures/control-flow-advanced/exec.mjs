// F-category: advanced control flow.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// for-in: own properties.
{
  const o = { b: 2, a: 1, c: 3 };
  const keys = [];
  for (const k in o) keys.push(k);
  result.for_in_own = keys;
}

// for-in: inherited properties.
{
  const proto = { x: 1 };
  const child = Object.create(proto);
  child.y = 2;
  const keys = [];
  for (const k in child) keys.push(k);
  result.for_in_inherited = keys.sort();
}

// for-in: non-enumerable excluded.
{
  const o = {};
  Object.defineProperty(o, "hidden", { value: 1, enumerable: false });
  o.visible = 2;
  const keys = [];
  for (const k in o) keys.push(k);
  result.for_in_non_enum = keys;
}

// switch: basic matching + break.
{
  function grade(n) {
    switch (n) {
      case "A": return 4;
      case "B": return 3;
      case "C": return 2;
      default: return 0;
    }
  }
  result.switch_basic = { A: grade("A"), B: grade("B"), D: grade("D") };
}

// switch: fall-through.
{
  const log = [];
  switch (2) {
    case 1: log.push("one");
    case 2: log.push("two");
    case 3: log.push("three"); break;
    case 4: log.push("four");
  }
  result.switch_fallthrough = log;
}

// switch: default in middle.
{
  const log = [];
  switch (99) {
    case 1: log.push("one"); break;
    default: log.push("default"); break;
    case 2: log.push("two"); break;
  }
  result.switch_default_mid = log;
}

// switch: strict equality.
{
  let hit = "none";
  switch (0) {
    case false: hit = "false"; break;
    case 0: hit = "zero"; break;
  }
  result.switch_strict = hit;
}

// Labeled break.
{
  const collected = [];
  outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) break outer;
      collected.push(`${i},${j}`);
    }
  }
  result.labeled_break = collected;
}

// Labeled continue.
{
  const collected = [];
  outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (j === 1) continue outer;
      collected.push(`${i},${j}`);
    }
  }
  result.labeled_continue = collected;
}

// Comma operator.
{
  let x = (1, 2, 3);
  let y = 0;
  let z = (y++, y++, y);
  result.comma = { x, z };
}

// Ternary nesting.
{
  function classify(n) {
    return n > 0 ? "positive" : n < 0 ? "negative" : "zero";
  }
  result.ternary = {
    pos: classify(5),
    neg: classify(-3),
    zero: classify(0),
  };
}

// do-while.
{
  let i = 0;
  const vals = [];
  do { vals.push(i); i++; } while (i < 4);
  result.do_while = vals;

  let ran = false;
  do { ran = true; } while (false);
  result.do_while_once = ran;
}

// for-of with early break.
{
  const arr = [10, 20, 30, 40, 50];
  const collected = [];
  for (const v of arr) {
    if (v > 25) break;
    collected.push(v);
  }
  result.for_of_break = collected;
}

// for-of with destructuring.
{
  const entries = [[1, "a"], [2, "b"], [3, "c"]];
  const collected = [];
  for (const [k, v] of entries) collected.push(`${k}=${v}`);
  result.for_of_destruct = collected;
}

// try-catch-finally ordering.
{
  const log = [];
  try {
    log.push("try");
    throw new Error("e");
  } catch (e) {
    log.push("catch");
  } finally {
    log.push("finally");
  }
  result.try_catch_finally = log;
}

console.log(canon(result));
