/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const fs = require('fs');

const Fate = require('../Fate');

/**
 * 视图
 */
class View {

    /**
     * constructor
     *
     * @param {any} context
     */
    constructor(context) {
        /**
         * @property {any} context 上下文环境
         */
        this.context = context;

        /**
         * @property {String} 默认视图文件后缀
         */
        this.defaultExtension = '.html';
    }

    /**
     * 查找视图文件路径
     *
     * @param {String} view 视图文件名
     * @return {String}
     */
    findViewFile(view) {
        if('@' === view.charAt(0)) {
            return Fate.getPathAlias(view) + this.defaultExtension;
        }

        let app = Fate.app;
        let context = this.context;

        // 模块无子目录 普通控制器有子目录
        if('' !== context.moduleId) {
            return app.modules[context.moduleId]
                + '/views/'
                + view + this.defaultExtension;
        }

        return app.getAppPath()
            + '/views/'
            + context.viewPath
            + '/'
            + view + this.defaultExtension;
    }

    /**
     * 读取视图文件内容
     *
     * @param {String} view 视图文件名
     * @param {Function} callback 回调函数
     * @return {String}
     */
    getViewContent(view, callback) {
        let file = this.findViewFile(view);

        fs.readFile(file, Fate.app.encoding, callback);
    }

    /**
     * 模板渲染入口
     *
     * 模板引擎必须实现这个方法
     *
     * @param {String} file 文件路径
     * @param {any} parameters 参数
     */
    renderFile(file, parameters) {}

    /**
     * 渲染视图文件
     *
     * @param {String} view 视图名
     * @param {any} parameters 参数
     */
    render(view, parameters = null) {
        let file = this.findViewFile(view);

        return this.renderFile(file, parameters);
    }

}

module.exports = View;
