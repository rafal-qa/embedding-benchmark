type Middleware func(http.Handler) http.Handler

func Chain(handler http.Handler, middlewares ...Middleware) http.Handler {
    for i := len(middlewares) - 1; i >= 0; i-- {
        handler = middlewares[i](handler)
    }
    return handler
}
func RequireHeader(name string) Middleware {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            if r.Header.Get(name) == "" {
                http.Error(w, "missing "+name, http.StatusBadRequest)
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}
func StripPrefix(prefix string) Middleware {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            if len(r.URL.Path) >= len(prefix) &&
                r.URL.Path[:len(prefix)] == prefix {
                r.URL.Path = r.URL.Path[len(prefix):]
            }
            next.ServeHTTP(w, r)
        })
    }
}
