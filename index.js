"use strict";
const http = require("http");
const Hook = require("./core/Hook");
/**
 * 入口
 */
class FateJs {
    /**
     * constructor
     *
     * @typedef {import('./core/Application')} Application
     * @param {Application} application 应用实例
     */
    constructor(application) {
        /**
         * http server
         */
        this.server = null;
        this.app = application;
    }
    // web
    requestListener(req, res) {
        try {
            this.app.requestListener(req, res);
        }
        catch (e) {
            this.app.handlerException(e, res);
        }
    }
    // handler
    handler(req, res) {
        new Hook().trigger(req, res, (request, response) => {
            this.requestListener(request, response);
        });
    }
    /**
     * 获取 http server
     *
     * @return {http.Server}
     */
    getServer() {
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
    listen(...args) {
        this.server = this.getServer();
        this.server.listen(...args);
    }
}
module.exports = FateJs;
