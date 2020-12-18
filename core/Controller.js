/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Component = require('./Component');
const ActionEvent = require('./ActionEvent');

/**
 * 控制器基类
 */
class Controller extends Component {

    /**
     * constructor
     *
     * @param {any} context
     */
    constructor(context) {
        super();

        /**
         * @property {any} context 上下文环境 用于保存当前请求相关的信息
         */
        this.context = context;
    }

    /**
     * 控制器方法执行前
     *
     * @param {ActionEvent} actionEvent
     */
    beforeAction(actionEvent) {
        this.trigger(Controller.EVENT_BEFORE_ACTION, actionEvent);
    }

    /**
     * 控制器方法执行后
     *
     * @param {ActionEvent} actionEvent
     */
    afterAction(actionEvent) {
        this.trigger(Controller.EVENT_AFTER_ACTION, actionEvent);
    }

    /**
     * 执行控制器的方法
     *
     * @param {any} request
     * @param {any} response
     */
    runControllerAction(request, response) {
        let actionEvent = new ActionEvent();
        actionEvent.request = request;
        actionEvent.response = response;

        this.beforeAction(actionEvent);

        if(true !== actionEvent.valid) {
            return;
        }

        this.run(request, response);

        this.afterAction(actionEvent);
    }

    /**
     * 执行控制器入口
     *
     * @param {any} request
     * @param {any} response
     */
    run(request, response) {}

    /**
     * 渲染文件
     *
     * @param {String} view 视图名
     * @param {any} parameters 参数
     */
    render(view, parameters = null) {}

}

/**
 * @property {String} EVENT_BEFORE_ACTION
 */
Controller.EVENT_BEFORE_ACTION = 'beforeAction';

/**
 * @property {String} EVENT_AFTER_ACTION
 */
Controller.EVENT_AFTER_ACTION = 'afterAction';

module.exports = Controller;
