/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Fate = require('../Fate');
const InvalidConfigException = require('../core/InvalidConfigException');
const InvalidArgumentException = require('../core/InvalidArgumentException');
const ICache = require('./ICache');

class Cache {

    /**
     * 获取缓存实例
     *
     * @param {Object} cacheFlag
     * @return {ICache}
     */
    static getCache(cacheFlag) {
        let app = Fate.app;

        if(undefined === app.cache || undefined === app.cache[type]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }

        if(undefined === app.cache[type].classPath) {
            throw new InvalidConfigException('The classPath of cache configuration is not found');
        }

        if(!Cache._instances.has(type)) {
            Cache._instances.set(type, Fate.createObjectAsDefinition(app.cache[type]));
            Cache._instances.get(type).init();
        }

        rreturn Cache._instances.get(type);
    }

}

/**
 * @type {Map<String, any>}
 */
Cache._instances = new Map();

module.exports = Cache;
