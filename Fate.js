/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 辅助类
 */
class Fate {

    /**
     * @ 别名路径转换真实路径
     *
     * @param {String} alias 路径别名
     * @return {String} 路径
     */
    static getPathAlias(alias) {
        if('@' !== alias.charAt(0)) {
            return alias;
        }

        // 截取开头作为别名
        let pos = alias.indexOf('/');
        let root = -1 === pos ? alias : alias.substring(0, pos);
        if(Fate.pathAliases.has(root)) {
            return -1 === pos
                ? Fate.pathAliases.get(root)
                : Fate.pathAliases.get(root) + alias.substring(pos);
        }

        return '';
    }

    /**
     * 设置路径别名
     *
     * @param {String} alias 路径别名
     * @param {String} path 路径
     */
    static setPathAlias(alias, path) {
        if('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }

        if('/' === path.charAt(path.length - 1)) {
            path = path.substring(0, path.length - 1);
        }

        Fate.pathAliases.set(alias, path);
    }

    /**
     * 删除路径别名
     *
     * @param {String} alias 路径别名
     */
    static deletePathAlias(alias) {
        if('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }

        Fate.pathAliases.delete(alias);
    }

    /**
     * 创建对象
     *
     * @param {String | Map} 以某个别名开头的类全名或带 'classPath' 键的配置
     *
     * eg.
     * 'alias/path/Class'
     * or
     * {classPath: 'some/path/Class', ...}
     *
     * @param {any} parameters 构造函数参数
     * @return {any} 类实例
     */
    static createObject(clazz, ...parameters) {
        if('string' === typeof clazz) {
            return Fate.createObjectAsString(clazz, ...parameters);
        }

        return Fate.createObjectAsDefinition(clazz, ...parameters);
    }

    /**
     * 字符串方式创建对象
     *
     * @param {String} classPath
     */
    static createObjectAsString(classPath, ...parameters) {
        let realClass = Fate.getPathAlias('@' + classPath);

        let ClassName = require(realClass + Fate.defaultExtension);

        return new ClassName(...parameters);
    }

    /**
     * 配置方式创建对象
     *
     * @param {Map} definition
     */
    static createObjectAsDefinition(definition, ...parameters) {
        let realClass = Fate.getPathAlias('@' + definition.classPath);
        let properties = Fate.config({}, definition);

        let ClassName = require(realClass + Fate.defaultExtension);
        let instance = new ClassName(...parameters);

        delete properties.classPath;
        Fate.config(instance, properties);

        return instance;
    }

    /**
     * 导入一个类文件
     *
     * @param {String} clazz 类全名
     */
    static include(clazz) {
        let file = Fate.getPathAlias('@' + clazz);

        // 文件不存在抛出异常
        // todo

        return require(file + Fate.defaultExtension);
    }

    /**
     * 对象配置
     *
     * @param {any} object 需要配置的对象
     * @param {any} properties 配置项
     * @return {any} 源对象
     */
    static config(object, properties) {
        for(let key in properties) {
            object[key] = properties[key];
        }

        return object;
    }

}

/**
 * @property {Application} app 应用实例
 */
Fate.app = null;

/**
 * @property {Map<String, String>} pathAliases 路径别名
 */
Fate.pathAliases = new Map([ ['@fate', __dirname] ]);

/**
 * @property {String} defaultExtension 默认文件扩展名
 */
Fate.defaultExtension = '.js';

module.exports = Fate;
