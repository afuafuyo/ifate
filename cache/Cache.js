"use strict";
const Fate = require("../Fate");
const ServiceLocator = require("../ioc/ServiceLocator");
const InvalidConfigException = require("../core/InvalidConfigException");
class Cache {
    static getCache(type) {
        let app = Fate.app;
        if (undefined === app.cache || undefined === app.cache[type]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }
        if (!Cache.serviceLocator.hasService(type)) {
            Cache.serviceLocator.setService(type, Fate.createObjectAsDefinition(app.cache[type], app));
            Cache.serviceLocator.getService(type).init();
        }
        return Cache.serviceLocator.getService(type);
    }
}
Cache.serviceLocator = new ServiceLocator();
module.exports = Cache;
