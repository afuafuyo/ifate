"use strict";
const Fate = require("../Fate");
const InvalidConfigException = require("../core/InvalidConfigException");
class Cache {
    static getCache(type) {
        let app = Fate.app;
        if (undefined === app.cache || undefined === app.cache[type]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }
        if (undefined === app.cache[type].classPath) {
            throw new InvalidConfigException('The "classPath" configuration of the cache is missing');
        }
        if (!Cache.instances.has(type)) {
            Cache.instances.set(type, Fate.createObjectAsDefinition(app.cache[type], app));
            Cache.instances.get(type).init();
        }
        return Cache.instances.get(type);
    }
}
Cache.instances = new Map();
module.exports = Cache;
