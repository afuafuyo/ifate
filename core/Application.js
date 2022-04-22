"use strict";
const Fate = require("../Fate");
const Event = require("./Event");
const InvalidConfigException = require("./InvalidConfigException");
/**
 * 应用基类
 */
class Application extends Event {
    constructor(config) {
        super();
        /**
         * 编码
         */
        this.encoding = 'UTF-8';
        /**
         * 调试开关
         */
        this.debug = false;
        /**
         * 异常处理类
         */
        this.exceptionHandler = 'fate/web/ExceptionHandler';
        Fate.app = this;
        this.init(config);
    }
    /**
     * 初始化应用
     *
     * @param {any} config 应用配置
     * @throws {InvalidConfigException} 当丢失必要配置项目时
     */
    init(config) {
        if (undefined === config.id) {
            throw new InvalidConfigException('The "id" configuration of the Application is missing');
        }
        if (undefined !== config.appPath) {
            this.setAppPath(config.appPath);
            delete config.appPath;
        }
        if (undefined !== config.runtimePath) {
            this.setRuntimePath(config.runtimePath);
            delete config.runtimePath;
        }
        else {
            // set "app/runtime"
            this.setRuntimePath(this.getAppPath() + '/runtime');
        }
    }
    /**
     * 设置应用路径
     *
     * @param {String} path 应用路径
     */
    setAppPath(path) {
        Fate.setPathAlias('@app', path);
    }
    /**
     * 得到应用目录
     *
     * @return {String} 路径
     */
    getAppPath() {
        return Fate.getPathAlias('@app');
    }
    /**
     * 设置 runtime 路径
     *
     * @param {String} path 路径
     */
    setRuntimePath(path) {
        Fate.setPathAlias('@runtime', path);
    }
    /**
     * 得到 runtime 目录
     *
     * @return {String} 路径
     */
    getRuntimePath() {
        return Fate.getPathAlias('@runtime');
    }
}
module.exports = Application;
