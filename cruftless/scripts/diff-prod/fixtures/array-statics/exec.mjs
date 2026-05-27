// F-category: Array statics and deeper prototype methods.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// Array.from: iterable.
{
  result.from_iterable = Array.from(new Set([1, 2, 3]));
}

// Array.from: arrayLike.
{
  result.from_arraylike = Array.from({ length: 3, 0: "a", 1: "b", 2: "c" });
}

// Array.from: string (iterable of chars).
{
  result.from_string = Array.from("hello");
}

// Array.from: mapFn.
{
  result.from_mapfn = Array.from([1, 2, 3], (x) => x * 10);
}

// Array.from: mapFn with index.
{
  result.from_mapfn_idx = Array.from({ length: 4 }, (_, i) => i * i);
}

// Array.of.
{
  result.of_basic = Array.of(1, 2, 3);
  result.of_single = Array.of(5);
  result.of_empty = Array.of();
  result.of_mixed = Array.of("a", null, undefined, 0, false);
}

// Array.isArray.
{
  result.is_array = {
    array: Array.isArray([]),
    obj: Array.isArray({}),
    null_val: Array.isArray(null),
    string: Array.isArray("hello"),
    typed: Array.isArray(new Uint8Array(3)),
  };
}

// every / some.
{
  const a = [2, 4, 6, 8];
  result.every_some = {
    all_even: a.every((x) => x % 2 === 0),
    all_gt5: a.every((x) => x > 5),
    some_gt5: a.some((x) => x > 5),
    some_gt10: a.some((x) => x > 10),
    empty_every: [].every(() => false),
    empty_some: [].some(() => true),
  };
}

// reduce / reduceRight.
{
  result.reduce = {
    sum: [1, 2, 3, 4].reduce((acc, x) => acc + x, 0),
    product: [1, 2, 3, 4].reduce((acc, x) => acc * x, 1),
    no_init: [10, 20, 30].reduce((acc, x) => acc + x),
    right: ["a", "b", "c"].reduceRight((acc, x) => acc + x, ""),
  };
}

// fill.
{
  result.fill = {
    all: [1, 2, 3, 4].fill(0),
    range: [1, 2, 3, 4].fill(9, 1, 3),
    neg: [1, 2, 3, 4].fill(5, -2),
  };
}

// copyWithin.
{
  result.copy_within = {
    basic: [1, 2, 3, 4, 5].copyWithin(0, 3),
    range: [1, 2, 3, 4, 5].copyWithin(1, 3, 4),
    neg: [1, 2, 3, 4, 5].copyWithin(-2, 0, 2),
  };
}

// splice (mutating).
{
  const a = [1, 2, 3, 4, 5];
  const removed = a.splice(1, 2, 99, 88);
  result.splice = { after: a, removed };
}

// concat edge cases.
{
  result.concat = {
    arrays: [1, 2].concat([3, 4], [5]),
    mixed: [1].concat(2, [3], [[4]]),
    empty: [].concat([], []),
    non_array: [1].concat("a", null, undefined),
  };
}

// indexOf / lastIndexOf with fromIndex.
{
  const a = [1, 2, 3, 2, 1];
  result.index_of = {
    first: a.indexOf(2),
    from: a.indexOf(2, 2),
    last: a.lastIndexOf(2),
    last_from: a.lastIndexOf(2, 2),
    missing: a.indexOf(99),
  };
}

// flat with holes and mixed nesting.
{
  result.flat_mixed = {
    simple: [1, [2, 3], [4, [5]]].flat(),
    deep: [1, [2, [3, [4, [5]]]]].flat(Infinity),
    zero: [1, [2, 3]].flat(0),
  };
}

// entries / keys / values.
{
  const a = ["x", "y", "z"];
  result.iterators = {
    entries: [...a.entries()],
    keys: [...a.keys()],
    values: [...a.values()],
  };
}

console.log(canon(result));
