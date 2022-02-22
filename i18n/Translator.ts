import Fate = require('../Fate');
import AbstractTranslator = require('./AbstractTranslator');

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
    public translate(type: string, sourceMessage: string, parameters: any[] = null): string {
        let lang = this.loadLanguageFromFile(type);

        if(undefined === lang[sourceMessage]) {
            return sourceMessage;
        }

        let target = lang[sourceMessage];

        return this.parseMessage(target, parameters);
    }

}

export = Translator;
