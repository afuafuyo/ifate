"use strict";
const Fate = require("../../Fate");
const AbstractTranslator = require("../AbstractTranslator");
class Translator extends AbstractTranslator {
    constructor(application) {
        super(application);
        this.language = 'en-US';
        this.basePath = Fate.getPathAlias('@app/i18n');
    }
    loadLanguageFromFile(type) {
        let file = this.basePath + '/' + this.language + '/' + type;
        let lang = Fate.include(file, false);
        return lang;
    }
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
