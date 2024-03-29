"use strict";
const Fate = require("../Fate");
const ServiceLocator = require("../ioc/ServiceLocator");
const InvalidConfigException = require("../core/InvalidConfigException");
class I18N {
    constructor() { }
    static getTranslator(type) {
        let app = Fate.app;
        if (undefined === app.translator || undefined === app.translator[type]) {
            throw new InvalidConfigException('The translator configuration is not found');
        }
        if (!I18N.translators.hasService(type)) {
            I18N.translators.setService(type, Fate.createObjectAsDefinition(app.translator[type], app));
        }
        return I18N.translators.getService(type);
    }
}
I18N.translators = new ServiceLocator();
module.exports = I18N;
