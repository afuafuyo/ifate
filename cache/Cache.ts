import AbstractCache = require('./AbstractCache');

import Fate = require('../Fate');
import InvalidConfigException = require('../core/InvalidConfigException');

/**
 * 缓存入口
 */
class Cache {

    static _instances: Map<string, AbstractCache> = new Map();

    /**
     * 获取缓存实例
     */
    static getCache(type: string): AbstractCache {
        let app = Fate.app;

        if(undefined === app.cache || undefined === app.cache[type]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }
        if(undefined === app.cache[type].classPath) {
            throw new InvalidConfigException('The "classPath" configuration of the cache is missing');
        }

        if(!Cache._instances.has(type)) {
            Cache._instances.set(type, Fate.createObjectAsDefinition(app.cache[type], app));
            Cache._instances.get(type).init();
        }

        return Cache._instances.get(type);
    }

}

export = Cache;
