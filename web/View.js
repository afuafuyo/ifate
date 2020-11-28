/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const CoreView = require('../core/View');

/**
 * web 视图
 */
class View extends CoreView {

    /**
     * constructor
     *
     * @param {any} context
     */
    constructor(context) {
        super(context);
    }

    /**
     * @inheritdoc
     */
    renderFile(file, parameters) {
        this.context.response.write('View must implements the renderFile() method');
        return this.context.response.end();
    }

}

module.exports = View;
