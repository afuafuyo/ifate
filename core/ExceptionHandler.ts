/**
 * 异常错误处理基类
 */
abstract class ExceptionHandler {

    /**
     * 应用
     */
    public application: any;

    constructor(application) {
        this.application = application;
    }

    /**
     * 异常处理
     *
     * @param {any} exception 异常类
     * @param {any} response 输出类
     */
    public abstract handlerException(exception: any, response: any): void;

}

export = ExceptionHandler;
