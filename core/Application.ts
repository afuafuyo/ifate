import Fate = require('../Fate');
import Event = require('./Event');
import InvalidConfigException = require('./InvalidConfigException');

/**
 * 应用基类
 */
abstract class Application extends Event {

    /**
     * 编码
     */
    public encoding: string = 'UTF-8';

    /**
     * 调试开关
     */
    public debug: boolean = false;

    /**
     * 异常处理类
     */
    public exceptionHandler: string = 'fate/web/ExceptionHandler';

    constructor(config: any) {
        super();

        Fate.app = this;
        this.init(config);
    }

    /**
     * 初始化应用
     *
     * @param {any} config 应用配置
     * @throws {InvalidConfigException} 当丢失必要配置项目时
     */
    private init(config: any): void {
        if(undefined === config.id) {
            throw new InvalidConfigException('The "id" configuration of the Application is missing');
        }

        if(undefined !== config.appPath) {
            this.setAppPath(config.appPath);
            delete config.appPath;
        }

        if(undefined !== config.runtimePath) {
            this.setRuntimePath(config.runtimePath);
            delete config.runtimePath;

        } else {
            // set as "app/runtime"
            this.setRuntimePath(this.getAppPath() + '/runtime');
        }
    }

    /**
     * 设置应用路径
     *
     * @param {String} path 应用路径
     */
    public setAppPath(path: string): void {
        Fate.setPathAlias('@app', path);
    }

    /**
     * 得到应用目录
     *
     * @return {String} 路径
     */
    public getAppPath(): string {
        return Fate.getPathAlias('@app');
    }

    /**
     * 设置 runtime 路径
     *
     * @param {String} path 路径
     */
    public setRuntimePath(path: string): void {
        Fate.setPathAlias('@runtime', path);
    }

    /**
     * 得到 runtime 目录
     *
     * @return {String} 路径
     */
    public getRuntimePath(): string {
        return Fate.getPathAlias('@runtime');
    }

    /**
     * handle request
     *
     * @param {any} request http request
     * @param {any} response http response
     */
    public abstract requestListener(request: any, response: any): void;

    /**
     * 异常处理
     *
     * @param {any} exception 异常类
     * @param {any} response http response
     */
    public abstract handlerException(exception: any, response: any): void;

}

export = Application;
