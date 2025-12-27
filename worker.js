export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname

    // ---- exact file passthrough ----
    const exactFiles = [
      "/config.json",
      "/manifest.json",
      "/sw.js",
      "/pdf.worker.min.js",
    ]

    if (exactFiles.includes(path)) {
      return fetch(request)
    }

    // ---- static directories ----
    if (
      path.startsWith("/public/") ||
      path.startsWith("/assets/")
    ) {
      return fetch(request)
    }

    // ---- SPA fallback ----
    const indexURL = new URL("/index.html", url.origin)
    return fetch(indexURL)
  }
}
