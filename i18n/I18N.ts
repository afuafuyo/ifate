import AbstractTranslator = require('./AbstractTranslator');

import Fate = require('../Fate');
import ServiceLocator = require('../ioc/ServiceLocator');
import InvalidConfigException = require('../core/InvalidConfigException');

/**
 * 国际化
 *
 * ```
 * translator: {
 *      // 基于 file 的翻译器
 *      [type]: {
 *          classPath: 'fate/i18n/file/Translator',
 *          basePath: __dirname + '/app/messages'
 *      }
 * }
 * ```
 *
 */
class I18N {
    /**
     * 翻译器
     */
    private static translators: ServiceLocator = new ServiceLocator();

    private constructor() {}

    /**
     * 获取翻译器
     *
     * @param {String} type 翻译器类型
     */
    static getTranslator(type: string): AbstractTranslator {
        let app = Fate.app;

        if(undefined === app.translator || undefined === app.translator[type]) {
            throw new InvalidConfigException('The translator configuration is not found');
        }

        if(!I18N.translators.hasService(type)) {
            I18N.translators.setService(
                type,
                Fate.createObjectAsDefinition(app.translator[type], app)
            );
        }

        return I18N.translators.getService(type);
    }
}

export = I18N;
