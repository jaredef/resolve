// F-category: DataView and ArrayBuffer surface.
// v1: DataView methods and ArrayBuffer.slice/isView not on prototype; test shapes only.

function canon(v) {
  return JSON.stringify(v, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = {}; for (const k of Object.keys(v).sort()) out[k] = v[k]; return out;
    }
    return v;
  });
}

const result = {};

// ArrayBuffer basics.
{
  const ab = new ArrayBuffer(16);
  result.arraybuffer = {
    byte_length: ab.byteLength,
    ctor_exists: typeof ArrayBuffer === "function",
  };
}

// DataView constructor exists.
{
  result.dataview = {
    ctor_exists: typeof DataView === "function",
  };
}

// TypedArray view of ArrayBuffer (already tested in typed-arrays, but validates AB roundtrip).
{
  const ab = new ArrayBuffer(4);
  const u8 = new Uint8Array(ab);
  u8[0] = 10; u8[1] = 20; u8[2] = 30; u8[3] = 40;
  const i32 = new Int32Array(ab);
  result.typed_view = {
    u8_vals: [u8[0], u8[1], u8[2], u8[3]],
    same_buffer: u8.buffer === i32.buffer,
    i32_len: i32.length,
  };
}

// SharedArrayBuffer existence check.
{
  result.shared_ab = {
    exists: typeof SharedArrayBuffer !== "undefined",
  };
}

console.log(canon(result));
