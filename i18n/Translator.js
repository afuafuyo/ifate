"use strict";
const Fate = require("../Fate");
const AbstractTranslator = require("./AbstractTranslator");
/**
 * 翻译器
 */
class Translator extends AbstractTranslator {
    constructor() {
        super();
        this.language = 'en-US';
        this.basePath = Fate.getPathAlias('@app/i18n');
    }
    /**
     * @inheritdoc
     */
    translate(type, sourceMessage, parameters = null) {
        let lang = this.loadLanguageFromFile(type);
        if (undefined === lang[sourceMessage]) {
            return sourceMessage;
        }
        let target = lang[sourceMessage];
        return this.parseMessage(target, parameters);
    }
}
module.exports = Translator;
