/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Fate = require('../Fate');
const CoreController = require('../core/Controller');

/**
 * 控制器
 */
class Controller extends CoreController {

    /**
     * constructor
     *
     * @param {any} context
     */
    constructor(context) {
        super(context);

        /**
         * @property {View} view
         */
        this.view = null;
    }

    /**
     * 获取视图类
     *
     * @return {any}
     */
    getView() {
        if(null === this.view) {
            this.view = Fate.createObject(Fate.app.defaultView, this.context);
        }

        return this.view;
    }

    /**
     * 设置视图类
     *
     * @param {any} view
     */
    setView(view) {
        this.view = view;
    }

    /**
     * @inheritdoc
     */
    run(request, response) {
        response.write('Controller must implements the run() method');
        response.end();
    }

    /**
     * @inheritdoc
     */
    render(view, parameters = null) {
        return this.getView().render(view, parameters);
    }

}

module.exports = Controller;
