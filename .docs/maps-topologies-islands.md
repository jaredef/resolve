# Maps, Topologies, and Islands

The PRESTO architecture introduces three levels of client-side structure. Each level has a distinct role, a distinct lifecycle, and a distinct relationship to the server. Naming them precisely avoids the ambiguity that arises when "module" refers to both server-side engine extensions and client-side delivered code.

## The Three Levels

**Map** — the page. The complete representation that the user sees, including the server-rendered HTML shell (layout, navigation, content) and all delivered client-side structures. A map is what the browser paints. It is the document — the shared surface on which everything else exists.

**Topology** — one delivered code unit. A topology is pushed to the client via the [WebSocket ceremony](/docs/real-time-connections), [HTTP fetch, or SSE stream](/docs/module-delivery). It arrives with a scoped channel token and executes with the four standard bindings (ws, el, channelToken, channelFetch). A topology defines which islands exist, how they coordinate laterally, what state they share, and which signals travel vertically to the server.

**Island** — an individual interactive DOM region created by a topology. An island manages its own state, renders its own UI, and communicates with other islands through DOM events. An island does not exist independently — it is created and coordinated by its parent topology.

## How They Relate

A map can contain multiple topologies. A topology can create multiple islands. Islands within the same topology coordinate through whatever mechanism the topology defines (typically DOM CustomEvents). Topologies on the same map can also coordinate through the DOM, since they share the same document.

The server renders the map. Topologies are delivered onto it. Islands emerge within topologies.

## Examples

A **single-island topology**: the notepad module creates one text editor island. The topology is trivial — one island, no lateral coordination, optional vertical sync.

A **multi-island topology**: the coordination dashboard creates three islands (inventory, budget, alerts). The topology defines the lateral event bus between them, the budget calculation model, the alert threshold logic, and the vertical signaling for inventory mutations. The three islands are meaningless without the topology that coordinates them.

A **stateful topology**: the order workflow creates a state machine with six states. The topology defines the states, transitions, guards, and side effects. The islands (product list, cart, checkout form, payment form, confirmation) are views within the state machine. The topology determines which island is active based on the current state.

A **multi-topology map**: a dashboard page could load a metrics topology (charts and counters), a notifications topology (alert feed), and a quick-actions topology (shortcut buttons) — each delivered independently, each with its own channel token, each creating its own islands. The topologies don't need to know about each other, but they can coordinate through the shared DOM if needed.

## Relationship to Server Modules

Server modules and topologies serve different roles and should not be confused:

Server modules operate at boot time. They implement the Module interface, register capabilities (middleware, context providers, channel handlers), and participate in the engine's resolution pipeline. They have access to databases, file systems, and secrets. They run on the server and never reach the client.

Topologies operate at delivery time and beyond. They are code strings stored on the server and delivered to the client. They execute in the browser. They build DOM, manage state, and communicate through channels. They have no direct access to server resources — only what the channel token permits through channelFetch.

A server module may provide the channel handler that a topology's islands communicate with. The inventory server module registers a channel handler; the coord-dashboard topology's inventory island calls that handler through channelFetch. The server module and the topology cooperate, but they are distinct artifacts with distinct lifecycles and distinct trust boundaries.

## The Cartographic Metaphor

The naming is deliberately cartographic:

- The **map** is the territory — the complete document the user navigates
- **Topologies** describe the shape and connectivity of regions within the map — which islands exist, how they relate, what structure governs them
- **Islands** are distinct landmasses — interactive regions separated by the inert sea of server-rendered HTML

A topology is not a visual concept. It is a structural one. Two topologies on the same map may render their islands in interleaved DOM positions, sharing the same visual layout. The topology describes the coordination structure, not the visual arrangement.

## Directory Structure

In the reference implementation:

- Server modules: app/modules/ (engine extensions, TypeScript, boot-time registration)
- Topologies: app/modules/pushed/ (delivered code, JavaScript or TypeScript, runtime delivery)
- Islands: created dynamically by topologies at execution time (no static files)

The topologies directory will be renamed to app/topologies/ in a future refactoring to make the distinction explicit in the filesystem.

## Naming in Code

The client helper API uses the term "module" for backward compatibility, but the concept is a topology:

Deliver a topology via WebSocket, HTTP, or SSE, and it creates islands on the map.
