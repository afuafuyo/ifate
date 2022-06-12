"use strict";
class Fate {
    static getPathAlias(alias) {
        if ('@' !== alias.charAt(0)) {
            return alias;
        }
        let pos = alias.indexOf('/');
        let root = -1 === pos ? alias : alias.substring(0, pos);
        if (Fate.pathAliases.has(root)) {
            return -1 === pos
                ? Fate.pathAliases.get(root)
                : Fate.pathAliases.get(root) + alias.substring(pos);
        }
        return '';
    }
    static setPathAlias(alias, path) {
        if ('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }
        if ('/' === path.charAt(path.length - 1)) {
            path = path.substring(0, path.length - 1);
        }
        Fate.pathAliases.set(alias, path);
    }
    static deletePathAlias(alias) {
        if ('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }
        Fate.pathAliases.delete(alias);
    }
    static createObject(clazz, ...parameters) {
        if ('string' === typeof clazz) {
            return Fate.createObjectAsString(clazz, ...parameters);
        }
        return Fate.createObjectAsDefinition(clazz, ...parameters);
    }
    static createObjectAsString(classPath, ...parameters) {
        let ClassName = Fate.include(classPath, true);
        return new ClassName(...parameters);
    }
    static createObjectAsDefinition(definition, ...parameters) {
        let properties = Fate.configure({}, definition);
        let ClassName = Fate.include(definition.classPath, true);
        let instance = new ClassName(...parameters);
        delete properties.classPath;
        Fate.configure(instance, properties);
        return instance;
    }
    static include(clazz, isAlias = true) {
        let realClass = isAlias ? Fate.getPathAlias('@' + clazz) : clazz;
        return require(realClass + Fate.defaultExtension);
    }
    static configure(object, properties) {
        for (let key in properties) {
            object[key] = properties[key];
        }
        return object;
    }
}
Fate.app = null;
Fate.pathAliases = new Map([['@fate', __dirname]]);
Fate.defaultExtension = '.js';
module.exports = Fate;
