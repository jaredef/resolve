package engine

import "net/http"

// Record represents a content record from the adapter.
type Record map[string]interface{}

// RouteMatch holds a resolved route.
type RouteMatch struct {
	FilePath string
	Params   map[string]string
}

// ContentAdapter is the storage interface.
type ContentAdapter interface {
	Query(opts QueryOpts) ([]Record, error)
	Get(typeName string, identifier map[string]string) (Record, error)
	Create(typeName string, data map[string]interface{}) (Record, error)
	Update(typeName string, id string, data map[string]interface{}) (bool, error)
	Delete(typeName string, id string) (bool, error)
}

// QueryOpts for adapter queries.
type QueryOpts struct {
	Type   string
	Where  string
	Order  string
	Limit  int
	Offset int
}

// Module interface.
type Module interface {
	Name() string
	Manifest() ModuleManifest
	Boot(registry RegistryAPI)
}

// ModuleManifest declares capabilities.
type ModuleManifest struct {
	Trust            string   // "first-party" or "restricted"
	ContextProviders []string
	ChannelHandlers  []string
	Middleware       []string
}

// Middleware interface.
type Middleware interface {
	Name() string
	Handle(r *http.Request, next func() *http.Response) *http.Response
}

// ContextProvider resolves request context.
type ContextProvider interface {
	Resolve(r *http.Request) map[string]interface{}
}

// ChannelHandler handles channel API requests.
type ChannelHandler interface {
	Module() string
	Handle(subPath string, query map[string]string, userId string, opts ChannelOpts) ChannelResult
}

// ChannelOpts for handler calls.
type ChannelOpts struct {
	Method string
	Body   map[string]interface{}
}

// ChannelResult from a handler.
type ChannelResult struct {
	Status int
	Data   interface{}
}

// RegistryAPI is what modules use to register capabilities.
type RegistryAPI interface {
	RegisterMiddleware(mw Middleware)
	RegisterContextProvider(name string, cp ContextProvider)
	RegisterChannelHandler(ch ChannelHandler)
}

// TemplateProcessor processes templates before or after layout.
type TemplateProcessor interface {
	Phase() string // "pre-layout" or "post-layout"
	Process(content string, data map[string]interface{}) ProcessorResult
}

// ProcessorResult from a template processor.
type ProcessorResult struct {
	Content  string
	Redirect string
}

// DataContext is a mutable key-value map.
type DataContext map[string]interface{}

// Copy creates a shallow copy.
func (d DataContext) Copy() DataContext {
	out := make(DataContext, len(d))
	for k, v := range d {
		out[k] = v
	}
	return out
}

// Merge merges src into d.
func (d DataContext) Merge(src DataContext) {
	for k, v := range src {
		d[k] = v
	}
}
