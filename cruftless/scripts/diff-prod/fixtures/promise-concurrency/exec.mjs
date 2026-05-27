// F-category: Promise concurrency patterns.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// Promise.all: all resolve.
{
  const r = await Promise.all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ]);
  result.all_resolve = r;
}

// Promise.all: one rejects.
{
  let caught = null;
  try {
    await Promise.all([
      Promise.resolve(1),
      Promise.reject(new Error("fail")),
      Promise.resolve(3),
    ]);
  } catch (e) {
    caught = e.message;
  }
  result.all_reject = caught;
}

// Promise.allSettled: mixed.
{
  const r = await Promise.allSettled([
    Promise.resolve("ok"),
    Promise.reject(new Error("err")),
    Promise.resolve(42),
  ]);
  result.all_settled = r.map((x) => ({
    status: x.status,
    val: x.status === "fulfilled" ? x.value : x.reason.message,
  }));
}

// Promise.race: first wins.
{
  const r = await Promise.race([
    Promise.resolve("first"),
    Promise.resolve("second"),
  ]);
  result.race_resolve = r;
}

// Promise.race: reject wins.
{
  let caught = null;
  try {
    await Promise.race([
      Promise.reject(new Error("fast-fail")),
      Promise.resolve("slow-ok"),
    ]);
  } catch (e) {
    caught = e.message;
  }
  result.race_reject = caught;
}

// Promise.any: first fulfillment wins.
{
  const r = await Promise.any([
    Promise.reject(new Error("r1")),
    Promise.resolve("winner"),
    Promise.resolve("also-ok"),
  ]);
  result.any_resolve = r;
}

// Promise.withResolvers.
{
  if (typeof Promise.withResolvers === "function") {
    const { promise, resolve } = Promise.withResolvers();
    resolve(99);
    const val = await promise;
    result.with_resolvers = val;
  } else {
    result.with_resolvers = "absent";
  }
}

// Chaining: then returns new promise.
{
  const r = await Promise.resolve(1)
    .then((x) => x + 1)
    .then((x) => x * 3)
    .then((x) => x + 10);
  result.chaining = r;
}

// catch + then ordering.
{
  const log = [];
  await Promise.reject(new Error("e"))
    .catch((e) => { log.push("caught:" + e.message); return "recovered"; })
    .then((v) => { log.push("then:" + v); });
  result.catch_then = log;
}

// finally shape check.
{
  result.finally_shape = {
    exists: typeof Promise.prototype.finally === "function",
  };
}

// Nested promise flattening.
{
  const r = await Promise.resolve(Promise.resolve(Promise.resolve(42)));
  result.flatten = r;
}

// v1: thenable unwrapping deferred; skip.

console.log(canon(result));
