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
        if(undefined === cacheFlag) {
            throw new InvalidArgumentException('An argument must be provide for getCache()');
        }

        if(undefined === Fate.app.cache || undefined === Fate.app.cache[cacheFlag]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }

        if(undefined === Fate.app.cache[cacheFlag].classPath) {
            throw new InvalidConfigException('The classPath of cache configuration is not found');
        }

        if(undefined === Cache._caches[cacheFlag] || null === Cache._caches[cacheFlag]) {
            Cache._caches[cacheFlag] = Fate.createObject(Fate.app.cache[cacheFlag].classPath,
                Fate.app.cache[cacheFlag]);

            Cache._caches[cacheFlag].init();
        }

        return Cache._caches[cacheFlag];
    }

}

/**
 * @var {Map<String, ICache>} _caches
 */
Cache._caches = {};

module.exports = Cache;
