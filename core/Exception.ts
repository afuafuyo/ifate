/**
 * 异常
 */
class Exception extends Error {

    /**
     * 类名
     */
    public name: string;

    constructor(message: string) {
        super(message);

        this.name = this.constructor.name;
    }

    /**
     * 获得错误名
     *
     * @return {String} 异常类名称
     */
    public getName(): string {
        return this.name;
    }

}

export = Exception;
