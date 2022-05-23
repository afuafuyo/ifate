"use strict";
const Fate = require("../Fate");
const InvalidConfigException = require("../core/InvalidConfigException");
/**
 * 国际化
 *
 * ```
 * translator: {
 *      [type]: {
 *          classPath: 'fate/i18n/file/Translator',
 *          basePath: __dirname + '/app/messages'
 *      }
 * }
 * ```
 *
 */
class I18N {
    constructor() {
        /**
         * 翻译器
         */
        this.translators = new Map();
    }
    /**
     * 获取 i18n 实例
     */
    static getI18N() {
        if (null === I18N.instance) {
            I18N.instance = new I18N();
        }
        return I18N.instance;
    }
    /**
     * 翻译
     *
     * @param {String} type 消息类型
     * @param {String} message 消息
     * @param {any[]} parameters 消息中的占位参数
     */
    translate(type, message, parameters = null) {
        let translator = this.getTranslator(type);
        return translator.translate(type, message, parameters);
    }
    /**
     * 获取翻译器
     *
     * @param {String} type
     */
    getTranslator(type) {
        if (this.translators.has(type)) {
            return this.translators.get(type);
        }
        let app = Fate.app;
        if (undefined === app.translator || undefined === app.translator[type]) {
            throw new InvalidConfigException('The translator configuration is not found');
        }
        if (undefined === app.translator[type].classPath) {
            throw new InvalidConfigException('The "classPath" configuration of the translator is missing');
        }
        this.translators.set(type, Fate.createObjectAsDefinition(app.translator[type], app));
        return this.translators.get(type);
    }
}
/**
 * 实例
 */
I18N.instance = null;
module.exports = I18N;
