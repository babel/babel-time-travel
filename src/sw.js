import toolbox from "sw-toolbox";

const VERSION = 1;

toolbox.options.cache.name = "Babel-Time-Travel-" + VERSION;
toolbox.options.cache.maxEntries = 10;

// delete items older than a day
toolbox.options.cache.maxAgeSeconds = 60 * 60 * 24;

toolbox.router.get("/(.*)", toolbox.cacheFirst, {
  origin: "https://unpkg.com/"
});
toolbox.router.get("/(.*)", toolbox.cacheFirst, {
  origin: "https://cdnjs.cloudflare.com/"
});

toolbox.router.get("/*.js", toolbox.fastest);
toolbox.router.get("/*.css", toolbox.fastest);
toolbox.router.get("/", toolbox.networkFirst);

toolbox.router.default = toolbox.networkOnly;
