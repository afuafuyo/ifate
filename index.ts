import http = require('http');

import Hook = require('./core/Hook');

/**
 * 入口
 */
class FateJs {

    /**
     * http server
     */
    public server: http.Server = null;

    /**
     * 当前应用
     */
    public app: any;

    /**
     * constructor
     *
     * @typedef {import('./core/Application')} Application
     * @param {Application} application 应用实例
     */
    constructor(application: any) {
        this.app = application;
    }

    // web
    private requestListener(req: any, res: any): void {
        try {
            this.app.requestListener(req, res);

        } catch(e) {
            this.app.handlerException(e, res);
        }
    }

    // handler
    private handler(req: any, res: any): void {
        new Hook().trigger(req, res, (request, response) => {
            this.requestListener(request, response);
        });
    }

    /**
     * 获取 http server
     *
     * @return {http.Server}
     */
    public getServer(): http.Server {
        return http.createServer((req, res) => {
            this.handler(req, res);
        });
    }

    /**
     * listen
     *
     * If you want to create HTTPS server you can do so as shown here
     *
     * ```
     * const https = require('https');
     * const FateJs = require('ifate');
     *
     * const main = new FateJs({ ... });
     * https.createServer({ ... }, main.handler.bind(main)).listen(443);
     * ```
     *
     */
    public listen(...args): void {
        this.server = this.getServer();
        this.server.listen(...args);
    }

}

export = FateJs;
