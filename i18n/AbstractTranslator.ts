import ITranslator from './ITranslator';

import Fate = require('../Fate');

/**
 * 抽象层
 */
class AbstractTranslator implements ITranslator {

    /**
     * 语言
     */
    public language: string = '';

    /**
     * 语言配置所在目录
     */
    public basePath: string = '';

    constructor() {}

    /**
     * 设置语言
     */
    public setLanguage(language: string): void {
        this.language = language;
    }

    /**
     * 获取语言
     */
    public getLanguage(): string {
        return this.language;
    }

    /**
     * 设置基础路径
     */
    public setBasePath(basePath: string): void {
        this.basePath = basePath;
    }

    /**
     * 获取基础路径
     */
    public getBasePath(): string {
        return this.basePath;
    }

    /**
     * @inheritdoc
     */
    public translate(type: string, sourceMessage: string, parameters: any[] = null): string {
        return '';
    }

    /**
     * 解析消息中的参数
     *
     * ```
     * 'your name is {name}' => your name is xyz
     * ```
     *
     */
    public parseMessage(targetMessage: string, parameters: any[] = null): string {
        if(null === parameters) {
            return targetMessage;
        }

        let list = targetMessage.match(/\{[^\}]+\}/g);

        if(null === list) {
            return targetMessage;
        }

        for(let i=0; i<parameters.length; i++) {
            targetMessage = targetMessage.replace(list[i], parameters[i]);
        }

        return targetMessage;
    }

    /**
     * 从文件系统加载语言
     *
     * @param {String} type 消息类型
     */
    public loadLanguageFromFile(type: string): any {
        let file = this.basePath + '/' + this.language + '/' + type;
        let lang = Fate.include(file, false);

        return lang;
    }

}

export = AbstractTranslator;