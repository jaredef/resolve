# State Management

PRESTO provides a two-tier reactive state system for client-side coordination. The TopologyStore handles island-to-island communication within a topology. The MapStore handles topology-to-topology communication across a page. Server persistence is lazy — mutations are instant on the client, and dirty branches flush to the server on a debounced cycle.

## The Problem

Without a shared state system, islands coordinate through DOM events (CustomEvent on document.body) and vertical signals (channelFetch to the server). This creates two issues:

1. **Double renders** — an optimistic DOM update followed by a server response re-render causes visual latency
2. **No cross-topology awareness** — islands in one topology cannot read state from another topology

The state management layer solves both: mutations propagate synchronously through subscriptions (zero latency), and the MapStore provides cross-topology reads.

## TopologyStore

A TopologyStore is created by a topology to coordinate its islands. It holds a state tree, notifies subscribers on changes, tracks dirty branches, and lazily syncs to the server.

The store is initialized with an initial state shape and a channelFetch reference for server persistence. Islands subscribe to branches and receive synchronous callbacks when values change.

### Reactive Flow

When an island calls `store.set('items', newItems)`:

1. The value is updated in memory (instant)
2. The 'items' branch is marked dirty
3. All subscribers to 'items' are notified synchronously
4. A debounced sync timer starts (default 500ms)
5. If no further mutations occur within 500ms, dirty branches flush to the server via channelFetch

The key property: steps 1-3 are synchronous. An island that subscribes to 'items' re-renders in the same tick as the mutation. There is no wait for the server. The server sync (step 5) is a background concern that doesn't affect the UI.

### Derived State

Islands can derive state from other branches within the same topology. A budget island subscribes to 'items' and computes the total:

When items change, the subscription fires, computes the derived value, and sets it on the budget branch — which in turn notifies the alerts island. The entire chain (items → budget → alerts) executes synchronously in a single tick.

### Lazy Sync

Dirty branches accumulate during rapid interactions (clicking +/- repeatedly). The debounced sync waits for a quiet period (500ms by default), then flushes only the changed branches to the server in a single channelFetch POST. If the sync fails, the branches are re-marked as dirty and will retry on the next cycle.

The sync payload contains only the dirty branches, not the full state tree. The server receives scoped, minimal updates authenticated by the topology's channel token.

## MapStore

A MapStore coordinates state across multiple topologies on the same page. It is a page-level singleton — the first topology to access it creates it, subsequent topologies discover and join it.

### Registration

Each topology registers its TopologyStore under a name. The MapStore forwards change notifications from registered stores to map-level subscribers.

A topology subscribing to a branch in another topology's store — for example, a notifications topology reading 'coord.items' — receives updates whenever the coordination topology's items change.

### Leader-Coordinated Sync

The first topology to call `startSync()` on the MapStore becomes the leader. The leader runs a periodic flush cycle (default 2 seconds) that triggers `sync()` on all registered TopologyStores. Each topology flushes its own dirty branches through its own channelFetch with its own channel token.

This is coordinated sync (option 2 from the design): the leader decides WHEN to flush, but each topology flushes independently through its own authenticated channel. Token scoping is preserved. No topology can access another topology's server-side data through the sync mechanism.

### Cross-Topology Reads

The MapStore provides a unified read path across all registered topologies. Any topology can read any other topology's state through the MapStore — the reads are synchronous and local (no server round-trip). Only writes are scoped: a topology can only set values in its own TopologyStore.

## The Two-Tier Architecture

The state management forms a hierarchy:

**Islands** read from and write to their **TopologyStore**. Mutations propagate synchronously to sibling islands within the same topology.

**TopologyStores** register with the **MapStore**. Changes propagate to subscribers across topologies. The leader coordinates periodic server sync.

**The server** receives lazy, batched, scoped updates through authenticated channelFetch. It never holds client state between requests. The client is the authority between syncs. The server is the authority on persistence.

## Relationship to DOM Events

The TopologyStore replaces DOM CustomEvents for island coordination. Instead of:

- Island A dispatches a CustomEvent
- Island B listens for CustomEvents
- Island B re-renders from event data

The flow becomes:

- Island A sets a value in the store
- Island B's subscription fires synchronously
- Island B re-renders from the store value

The difference: subscriptions are synchronous and typed (the subscriber knows the path it's watching). CustomEvents are asynchronous and untyped (any listener receives any event). The store is the coordination mechanism; the DOM is just the rendering target.

## Relationship to Server State

The TopologyStore does NOT replace server-side data. It is a client-side cache with lazy writeback. The server's channel handler is the source of truth for persistence. The client's store is the source of truth for display.

On initial page load, the topology fetches data from the server (channelFetch GET) and populates the store. During interaction, the store holds the latest state. Dirty branches flush to the server periodically. On page reload, the cycle repeats — the server provides the persisted state, the client resumes.

This is the same model as offline-first databases: the client operates autonomously between syncs. The server persists the results. Neither needs to understand the other's internal model — ambivalent execution with agnostic determinism, applied to state management.

## File Sizes

- htx-store.js: 5.3KB raw, 2.8KB minified
- htx-ui.js: 8KB raw, 3.2KB minified
- htx-realtime.js: ~12KB raw

Total client infrastructure for a full topology with reactive state, UI components, and WebSocket/HTTP/SSE delivery: under 20KB.
