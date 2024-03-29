import fs = require('fs');

import Fate = require('../../Fate');
import AbstractCache = require('../AbstractCache');
import FileHelper = require('../../helpers/FileHelper');

/**
 * 文件缓存
 *
 * ```
 * 'cache': {
 *      'file': {
 *          'classPath': 'fate/cache/file/Cache',
 *          'cachePath': 'absolute path'
 *      }
 * }
 * ```
 *
 */
class Cache extends AbstractCache {

    /**
     * 扩展名
     */
    public fileExtension: string = '.bin';

    /**
     * 缓存目录
     */
    public cachePath: string = Fate.getPathAlias('@runtime/caches');

    constructor(application) {
        super(application);
    }

    private getCacheFile(key: string): string {
        return this.cachePath + '/' + key + this.fileExtension;
    }

    /**
     * @inheritdoc
     */
    public setSync(key: string, value: string, duration: number = 31536000000/* one year */): void {
        let cacheFile = this.getCacheFile(key);

        let life = (Date.now() + duration) / 1000;

        // 目录不存在就创建
        if(!fs.existsSync(this.cachePath)) {
            FileHelper.createDirectorySync(this.cachePath);
        }

        fs.writeFileSync(cacheFile, value, this.application.encoding);

        fs.utimesSync(cacheFile, life, life);
    }

    /**
     * @inheritdoc
     */
    public set(key: string, value: string, duration: number = 31536000000/* one year */): Promise<any> {
        return new Promise((resolve, reject) => {
            let cacheFile = this.getCacheFile(key);
            let life = (Date.now() + duration) / 1000;

            // 检查目录
            fs.access(this.cachePath, fs.constants.R_OK | fs.constants.W_OK, (error) => {
                if(null === error) {
                    fs.writeFile(cacheFile, value, this.application.encoding, (err) => {
                        if(null !== err) {
                            reject(err);
                            return;
                        }

                        fs.utimes(cacheFile, life, life, () => {
                            resolve(null);
                        });
                    });

                    return;
                }

                FileHelper.createDirectory(this.cachePath, 0o777, () => {
                    fs.writeFile(cacheFile, value, this.application.encoding, (err) => {
                        if(null !== err) {
                            reject(err);
                            return;
                        }

                        fs.utimes(cacheFile, life, life, () => {
                            resolve(null);
                        });
                    });
                });
            });
        });
    }

    /**
     * @inheritdoc
     */
    public getSync(key: string): string {
        let ret = null;
        let cacheFile = this.getCacheFile(key);

        if(fs.existsSync(cacheFile) && fs.statSync(cacheFile).mtime.getTime() > Date.now()) {
            ret = fs.readFileSync(cacheFile, this.application.encoding);
        }

        return ret;
    }

    /**
     * @inheritdoc
     */
    public get(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let cacheFile = this.getCacheFile(key);

            fs.stat(cacheFile, (error, stats) => {
                if(null !== error) {
                    reject(error);
                    return;
                }

                if(stats.mtime.getTime() < Date.now()) {
                    resolve(null);
                    return;
                }

                fs.readFile(cacheFile, this.application.encoding, (err, data) => {
                    if(null !== err) {
                        reject(err);
                        return;
                    }

                    resolve(data);
                });
            });
        });
    }

    /**
     * @inheritdoc
     */
    public deleteSync(key: string): void {
        let cacheFile = this.getCacheFile(key);

        fs.unlinkSync(cacheFile);
    }

    /**
     * @inheritdoc
     */
    public delete(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let cacheFile = this.getCacheFile(key);

            fs.unlink(cacheFile, (err) => {
                if(null !== err) {
                    reject(err);
                    return;
                }

                resolve(null);
            });
        });
    }

}

export = Cache;
