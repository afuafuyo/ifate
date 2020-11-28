/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Fate = require('../Fate');
const CoreExceptionHandler = require('../core/ExceptionHandler');

/**
 * web 异常错误处理
 */
class ExceptionHandler extends CoreExceptionHandler {

    /**
     * @inheritdoc
     */
    handlerException(response, exception) {
        response.setHeader('Content-Type', 'text/plain');
        response.writeHead(500);

        response.write(null !== Fate.app && true === Fate.app.debug
            ? exception.message + '\n' + exception.stack
            : 'The server encountered an internal error');
        response.end();
    }

}

module.exports = ExceptionHandler;
