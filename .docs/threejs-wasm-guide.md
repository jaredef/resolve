# Three.js + WASM Implementation Guide

This guide walks through building a real-time 3D visualization in HTX using Three.js for rendering and WebAssembly for geometry computation. The complete implementation is 231 lines (excluding CSS) in a single `.htx` file with no build step.

## Architecture

```
HTX Template (server-rendered shell)
  ├── Three.js (CDN — rendering library)
  ├── htx-realtime.js (WebSocket client helper)
  └── WASM geometry module (delivered over WebSocket)
       └── AssemblyScript → compute vertices at native speed
            └── Three.js BufferGeometry ← vertex data
                 └── WebGL renders at 60fps
```

Three patterns work together:
1. **Server-rendered shell** — HTX template provides the page structure, controls, and canvas container
2. **Compute State Transfer** — WASM binary delivered over authenticated WebSocket
3. **Client-side rendering** — Three.js consumes WASM-computed vertex data

## Step 1: Write the WASM Geometry Module

Create an AssemblyScript module that computes vertex positions. Each function writes float32 values to linear memory and returns the output length.

```typescript
// app/wasm-modules/geometry-src/index.ts

const OUTPUT_OFFSET: u32 = 1024;
let outputLen: u32 = 0;

export function getOutputOffset(): u32 { return OUTPUT_OFFSET; }
export function getOutputLen(): u32 { return outputLen; }

// Generate a torus knot — parametric curve
export function torusKnot(segments: u32, radius: f64, tube: f64, p: f64, q: f64): void {
  outputLen = 0;
  for (let i: u32 = 0; i <= segments; i++) {
    const t: f64 = (<f64>i / <f64>segments) * Math.PI * 2.0;
    const r: f64 = radius + tube * Math.cos(q * t);
    const x: f32 = <f32>(r * Math.cos(p * t));
    const y: f32 = <f32>(r * Math.sin(p * t));
    const z: f32 = <f32>(tube * Math.sin(q * t));
    store<f32>(OUTPUT_OFFSET + outputLen, x); outputLen += 4;
    store<f32>(OUTPUT_OFFSET + outputLen, y); outputLen += 4;
    store<f32>(OUTPUT_OFFSET + outputLen, z); outputLen += 4;
  }
}

// Generate an animated wave surface
export function waveSurface(gridSize: u32, amplitude: f64, frequency: f64, time: f64): void {
  outputLen = 0;
  for (let ix: u32 = 0; ix < gridSize; ix++) {
    for (let iz: u32 = 0; iz < gridSize; iz++) {
      const x: f64 = (<f64>ix / <f64>(gridSize - 1) - 0.5) * 4.0;
      const z: f64 = (<f64>iz / <f64>(gridSize - 1) - 0.5) * 4.0;
      const d: f64 = Math.sqrt(x * x + z * z);
      const y: f64 = amplitude * Math.sin(d * frequency - time);
      store<f32>(OUTPUT_OFFSET + outputLen, <f32>x); outputLen += 4;
      store<f32>(OUTPUT_OFFSET + outputLen, <f32>y); outputLen += 4;
      store<f32>(OUTPUT_OFFSET + outputLen, <f32>z); outputLen += 4;
    }
  }
}
```

## Step 2: Compile to WASM

```bash
bunx asc app/wasm-modules/geometry-src/index.ts \
  --outFile app/wasm-modules/geometry.wasm \
  --optimize --runtime stub --initialMemory 10 --noAssert
```

Result: a 3.4KB `.wasm` binary. The `--runtime stub` flag produces a minimal binary with no garbage collector. `--initialMemory 10` allocates 10 pages (640KB) for vertex output.

## Step 3: Write the Glue Code

The glue bridges WASM memory to JavaScript-friendly Float32Arrays:

```javascript
// app/wasm-modules/geometry-glue.js

var wasmMemory = exports.memory;
var getOutputOffset = exports.getOutputOffset;
var getOutputLen = exports.getOutputLen;

el.wasmGeometry = {
  torusKnot: function(segments, radius, tube, p, q) {
    exports.torusKnot(segments, radius, tube, p, q);
    return new Float32Array(wasmMemory.buffer, getOutputOffset(), getOutputLen() / 4);
  },
  waveSurface: function(gridSize, amplitude, frequency, time) {
    exports.waveSurface(gridSize, amplitude, frequency, time);
    return new Float32Array(wasmMemory.buffer, getOutputOffset(), getOutputLen() / 4);
  },
};
```

The glue attaches a helper object to the host element. The page script retrieves it after the WASM module loads. This avoids global variables — the data flows through the DOM element, consistent with the htx:script `el` binding pattern.

## Step 4: Build the HTX Template

The template has three parts: the HTML structure, the WASM loading, and the Three.js scene.

### HTML Structure

```html
<div class="three-canvas-wrap" id="three-canvas"></div>

<div class="three-controls">
  <select id="ctl-shape">
    <option value="torusKnot">Torus Knot</option>
    <option value="wave">Wave Surface</option>
  </select>
  <input type="range" id="ctl-segments" min="50" max="1000" value="300" />
  <input type="range" id="ctl-paramA" min="1" max="10" value="2" step="0.1" />
  <input type="color" id="ctl-color" value="#5b96d5" />
</div>

<div id="three-status">Loading WASM...</div>
<span id="wasm-host" style="display:none;"></span>
```

The canvas container, parameter controls, status display, and a hidden WASM host element. All server-rendered HTML — Three.js hasn't loaded yet.

### WASM Loading

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="/js/htx-realtime.js?v=ed28f078"></script>
<script>
  var rt = new HtxRealtime('{{ ws.token }}');

  rt.on('open', function() {
    rt.requestWasmModule('geometry', document.getElementById('wasm-host'))
      .then(function(result) {
        var geo = document.getElementById('wasm-host').wasmGeometry;
        initScene(geo);
      });
  });
</script>
```

The flow:
1. Three.js loads from CDN (cached by the browser)
2. `HtxRealtime` connects via WebSocket (authenticated with `{{ ws.token }}`)
3. `requestWasmModule('geometry', ...)` sends the request, receives the 3.4KB binary, instantiates it, runs the glue
4. The glue attaches `wasmGeometry` to the host element
5. `initScene(geo)` creates the Three.js scene with the WASM helper

### Three.js Scene

```javascript
function initScene(geo) {
  var container = document.getElementById('three-canvas');
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  container.appendChild(renderer.domElement);

  // Create points geometry
  var geometry = new THREE.BufferGeometry();
  var material = new THREE.PointsMaterial({ color: 0x5b96d5, size: 0.04 });
  var points = new THREE.Points(geometry, material);
  scene.add(points);

  function updateGeometry(time) {
    var verts = geo.torusKnot(300, 1.0, 0.3, 2.0, 3.0);
    // Copy from WASM memory (may be detached on next call)
    var positions = new Float32Array(verts.length);
    positions.set(verts);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  }

  function animate(time) {
    requestAnimationFrame(animate);
    points.rotation.y += 0.003;
    if (shape === 'wave') updateGeometry(time);
    renderer.render(scene, camera);
  }

  updateGeometry(0);
  animate(0);
}
```

The key line: `geo.torusKnot(300, ...)` calls the WASM function, which computes 300 3D vertices in under 0.5ms, and returns a Float32Array view into WASM linear memory. Three.js consumes it directly as a BufferAttribute.

## Step 5: Orbit Controls

Manual orbit camera (no OrbitControls dependency):

```javascript
var spherical = { theta: Math.PI / 4, phi: Math.PI / 3, radius: 4 };

renderer.domElement.addEventListener('mousemove', function(e) {
  if (!isDragging) return;
  spherical.theta += (e.clientX - prevMouse.x) * 0.005;
  spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1,
    spherical.phi - (e.clientY - prevMouse.y) * 0.005));
  updateCamera();
});

renderer.domElement.addEventListener('wheel', function(e) {
  spherical.radius = Math.max(1, Math.min(10, spherical.radius + e.deltaY * 0.005));
  updateCamera();
});
```

Spherical coordinates mapped from mouse drag and scroll. Touch events mirror the mouse handlers. No external dependency — 20 lines of vanilla JS.

## Performance

On a Raspberry Pi 5 serving the page, with a modern browser rendering:

| Metric | Value |
|--------|-------|
| WASM binary size | 3.4KB |
| WASM delivery | Single binary WebSocket frame |
| Vertex computation (300 points) | < 0.5ms |
| Vertex computation (1000 points) | < 1.5ms |
| Wave surface (50x50 grid, per frame) | < 0.8ms |
| Render FPS | 60fps (browser-limited) |
| Total page size | ~250KB (Three.js is 240KB from CDN, cached) |
| HTX template | 231 lines (excluding CSS) |

The WASM computation is negligible. Three.js rendering is the bottleneck, and it's running entirely on the client GPU. The server's only job was to deliver the HTML shell and the 3.4KB WASM binary.

## Why Not Just JavaScript?

The torus knot and wave surface math could be written in JavaScript. For 300 points, the performance difference is small. But:

1. **1000+ points**: WASM's typed memory access and ahead-of-time compilation give 2-5x speedup over JS for tight math loops
2. **Per-frame computation**: The wave surface recomputes every frame. At 60fps, even small per-call savings accumulate
3. **Pattern demonstration**: The same WASM delivery mechanism works for genuinely compute-heavy tasks (physics engines, ray marching, fluid simulation)
4. **Binary delivery**: The 3.4KB WASM binary is smaller than the equivalent minified JS and doesn't need parsing by the JS engine

## Extending This

### Physics simulation
Add a WASM function that computes particle positions based on forces, constraints, and timesteps. Feed the positions to Three.js each frame. The browser renders; WASM simulates.

### Procedural terrain
WASM generates a heightmap from noise functions. Three.js renders it as a mesh with vertex displacement. Parameters (octaves, persistence, scale) controlled by sliders, recomputed by WASM in real-time.

### Collaborative 3D
Combine with the WebSocket SPA pattern. Camera positions and parameter changes sync between clients via WebSocket. Everyone sees the same scene from different angles.

### Server-decided scenes
Different users get different WASM modules pushed over WebSocket. A free user sees a basic shape. A pro user gets the full parametric surface toolkit. The server decides what capabilities the client receives — same as every other layer in the HTX stack.
