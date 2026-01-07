export default {
  async fetch(request, env) {
    try {
      // Try to serve the static file
      let response = await env.__STATIC_CONTENT.fetch(request);

      // If not found, serve SPA fallback
      if (response.status === 404) {
        const url = new URL(request.url);
        response = await env.__STATIC_CONTENT.fetch(
          new Request(`${url.origin}/index.html`, request)
        );
      }

      return response;
    } catch (err) {
      return new Response("Error fetching content", { status: 500 });
    }
  }
};
