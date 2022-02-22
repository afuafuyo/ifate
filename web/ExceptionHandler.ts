import Fate = require('../Fate');
import CoreExceptionHandler = require('../core/ExceptionHandler');

/**
 * web 异常错误处理
 */
class ExceptionHandler extends CoreExceptionHandler {

    /**
     * @inheritdoc
     */
    public handlerException(response: any, exception: any): void {
        response.setHeader('Content-Type', 'text/plain');
        response.writeHead(500);

        response.write(null !== Fate.app && true === Fate.app.debug
            ? exception.message + '\n' + exception.stack
            : 'The server encountered an internal error');
        response.end();
    }

}

export = ExceptionHandler;
