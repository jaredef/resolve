package engine

import (
	"log"
	"sync"
)

// ModuleRegistry manages module lifecycle and capabilities.
type ModuleRegistry struct {
	mu               sync.RWMutex
	middleware       []Middleware
	contextProviders map[string]ContextProvider
	channelHandlers  map[string]ChannelHandler
	processors       []TemplateProcessor
}

func NewModuleRegistry() *ModuleRegistry {
	return &ModuleRegistry{
		contextProviders: make(map[string]ContextProvider),
		channelHandlers:  make(map[string]ChannelHandler),
	}
}

func (mr *ModuleRegistry) RegisterMiddleware(mw Middleware) {
	mr.mu.Lock()
	defer mr.mu.Unlock()
	mr.middleware = append(mr.middleware, mw)
}

func (mr *ModuleRegistry) RegisterContextProvider(name string, cp ContextProvider) {
	mr.mu.Lock()
	defer mr.mu.Unlock()
	mr.contextProviders[name] = cp
}

func (mr *ModuleRegistry) RegisterChannelHandler(ch ChannelHandler) {
	mr.mu.Lock()
	defer mr.mu.Unlock()
	mr.channelHandlers[ch.Module()] = ch
}

func (mr *ModuleRegistry) RegisterProcessor(tp TemplateProcessor) {
	mr.mu.Lock()
	defer mr.mu.Unlock()
	mr.processors = append(mr.processors, tp)
}

func (mr *ModuleRegistry) GetMiddleware() []Middleware {
	mr.mu.RLock()
	defer mr.mu.RUnlock()
	return mr.middleware
}

func (mr *ModuleRegistry) GetContextProviders() map[string]ContextProvider {
	mr.mu.RLock()
	defer mr.mu.RUnlock()
	return mr.contextProviders
}

func (mr *ModuleRegistry) GetChannelHandler(moduleName string) ChannelHandler {
	mr.mu.RLock()
	defer mr.mu.RUnlock()
	return mr.channelHandlers[moduleName]
}

func (mr *ModuleRegistry) GetProcessors(phase string) []TemplateProcessor {
	mr.mu.RLock()
	defer mr.mu.RUnlock()
	var out []TemplateProcessor
	for _, p := range mr.processors {
		if p.Phase() == phase {
			out = append(out, p)
		}
	}
	return out
}

// BootAll boots all modules with manifest enforcement.
func (mr *ModuleRegistry) BootAll(modules []Module) {
	for _, mod := range modules {
		manifest := mod.Manifest()
		var registry RegistryAPI

		if manifest.Trust == "first-party" {
			registry = mr
		} else {
			registry = newSandbox(mod.Name(), manifest, mr)
		}

		func() {
			defer func() {
				if r := recover(); r != nil {
					log.Printf("Module boot failed: %s: %v", mod.Name(), r)
				}
			}()
			mod.Boot(registry)
			log.Printf("Module booted: %s", mod.Name())
		}()
	}
}

// sandbox enforces manifest capabilities.
type sandbox struct {
	moduleName string
	manifest   ModuleManifest
	parent     *ModuleRegistry
}

func newSandbox(name string, manifest ModuleManifest, parent *ModuleRegistry) *sandbox {
	return &sandbox{moduleName: name, manifest: manifest, parent: parent}
}

func (s *sandbox) RegisterMiddleware(mw Middleware) {
	for _, allowed := range s.manifest.Middleware {
		if allowed == mw.Name() {
			s.parent.RegisterMiddleware(mw)
			return
		}
	}
	log.Printf("%s: undeclared middleware %s", s.moduleName, mw.Name())
}

func (s *sandbox) RegisterContextProvider(name string, cp ContextProvider) {
	for _, allowed := range s.manifest.ContextProviders {
		if allowed == name {
			s.parent.RegisterContextProvider(name, cp)
			return
		}
	}
	log.Printf("%s: undeclared context provider %s", s.moduleName, name)
}

func (s *sandbox) RegisterChannelHandler(ch ChannelHandler) {
	for _, allowed := range s.manifest.ChannelHandlers {
		if allowed == ch.Module() {
			s.parent.RegisterChannelHandler(ch)
			return
		}
	}
	log.Printf("%s: undeclared channel handler %s", s.moduleName, ch.Module())
}
