import AbstractCache = require('./AbstractCache');

import Fate = require('../Fate');
import ServiceLocator = require('../ioc/ServiceLocator');
import InvalidConfigException = require('../core/InvalidConfigException');

/**
 * 缓存入口
 */
class Cache {

    /**
     * 实例
     */
    private static serviceLocator: ServiceLocator = new ServiceLocator();

    /**
     * 获取缓存实例
     */
    static getCache(type: string): AbstractCache {
        let app = Fate.app;

        if(undefined === app.cache || undefined === app.cache[type]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }

        if(!Cache.serviceLocator.hasService(type)) {
            Cache.serviceLocator.setService(
                type,
                Fate.createObjectAsDefinition(app.cache[type], app)
            );
            Cache.serviceLocator.getService(type).init();
        }

        return Cache.serviceLocator.getService(type);
    }

}

export = Cache;
