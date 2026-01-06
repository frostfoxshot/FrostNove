export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Try asset first
    let response = await env.ASSETS.fetch(request);

    // If asset not found, serve SPA entry
    if (response.status === 404) {
      response = await env.ASSETS.fetch(
        new Request(`${url.origin}/index.html`, request)
      );
    }

    return response;
  }
};
