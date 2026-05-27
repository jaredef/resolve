// F-category: bitwise operators.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// AND, OR, XOR.
{
  result.logic = {
    and: 0b1100 & 0b1010,
    or: 0b1100 | 0b1010,
    xor: 0b1100 ^ 0b1010,
  };
}

// NOT.
{
  result.not = {
    zero: ~0,
    one: ~1,
    neg_one: ~-1,
    hex: ~0xFF,
  };
}

// Left shift.
{
  result.lshift = {
    basic: 1 << 4,
    from_3: 3 << 2,
    large: 1 << 31,
    zero: 0 << 10,
  };
}

// Signed right shift.
{
  result.rshift = {
    basic: 16 >> 2,
    neg: -16 >> 2,
    one: 1 >> 1,
    large: (-1) >> 5,
  };
}

// Unsigned right shift.
{
  result.urshift = {
    basic: 16 >>> 2,
    neg: (-1) >>> 0,
    neg_shift: (-1) >>> 16,
    zero: 0 >>> 5,
  };
}

// 32-bit truncation.
{
  result.truncation = {
    to_int32: 0xFFFFFFFF | 0,
    positive: 0x7FFFFFFF | 0,
    wrap: (0x80000000) | 0,
  };
}

// Bitwise assignment operators.
{
  let a = 0xFF;
  a &= 0x0F;
  let b = 0x0F;
  b |= 0xF0;
  let c = 0xFF;
  c ^= 0x0F;
  let d = 1;
  d <<= 8;
  let e = 256;
  e >>= 4;
  let f = -1;
  f >>>= 24;
  result.assign = { a, b, c, d, e, f };
}

// Practical patterns.
{
  const hasRead = 1 << 0;
  const hasWrite = 1 << 1;
  const hasExec = 1 << 2;
  let perms = 0;
  perms |= hasRead;
  perms |= hasExec;
  result.flags = {
    perms,
    can_read: (perms & hasRead) !== 0,
    can_write: (perms & hasWrite) !== 0,
    can_exec: (perms & hasExec) !== 0,
    toggled: perms ^ hasRead,
  };
}

// Bitwise with non-integer coercion.
{
  result.coercion = {
    float_and: 3.9 & 5,
    bool_or: true | 0,
    null_xor: null ^ 1,
    str_and: "7" & 3,
  };
}

console.log(canon(result));
