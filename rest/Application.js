/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const url = require('url');

const FastRegExpRouter = require('fast-regexp-router');

const Fate = require('../Fate');
const CoreApp = require('../core/Application');
const InvalidRouteException = require('../core/InvalidRouteException');

/**
 * rest application
 */
class Application extends CoreApp {

    constructor(config) {
        super(config);

        /**
         * 请求方法
         *
         * each method has the follow structure
         *
         * [
         *      { route: route1, handler: callbackFunction1 },
         *      { route: route2, handler: callbackFunction2 }
         * ]
         *
         */
        this.methods = {
            GET: [],
            POST: [],
            PUT: [],
            DELETE: [],
            PATCH: [],
            HEAD: [],
            OPTIONS: []
        };

        Fate.config(this, config);
    }

    /**
     * 请求处理
     *
     * @param {any} request
     * @param {any} response
     */
    requestListener(request, response) {
        let route = url.parse(request.url).pathname;
        let ret = this.resolveRoutes(route, request.method);

        if(null === ret) {
            throw new InvalidRouteException('The REST route requested is invalid ' + route);
        }

        // handler is function
        if('function' === typeof ret.handler) {
            ret.handler(request, response, ret.parameters);

            return;
        }

        // handler is string
        let pos = ret.handler.indexOf(Application.separator);
        let obj = null;
        if(-1 === pos) {
            obj = Fate.createObjectAsString(ret.handler);
            obj.run(request, response, ret.parameters);

        } else {
            obj = Fate.createObjectAsString( ret.handler.substring(0, pos) );
            obj[ ret.handler.substring(pos + 1) ](request, response, ret.parameters);
        }
    }

    /**
     * 解析路由
     *
     * @param {String} route 路由
     * @param {String} httpMethod 请求方法
     * @return {any | null}
     */
    resolveRoutes(route, httpMethod) {
        let routesMap = this.methods[httpMethod];
        if(0 === routesMap.length) {
            return null;
        }

        let regExpRouter = new FastRegExpRouter();
        regExpRouter.setRoutes(routesMap);

        return regExpRouter.exec(route);
    }

    /**
     * Adds a route to the collection
     *
     * @param {String} httpMethod
     * @param {String} route
     * @param {Function | String} handler
     */
    addRoute(httpMethod, route, handler) {
        this.methods[httpMethod].push({
            route: route,
            handler: handler
        });
    }

    /**
     * Adds routes to the collection
     *
     * @param {Array} httpMethods
     * @param {String} route
     * @param {Function | String} handler
     */
    addRoutes(httpMethods, route, handler) {
        for(let i=0,len=httpMethods.length; i<len; i++) {
            this.methods[httpMethods[i]].push({
                route: route,
                handler: handler
            });
        }
    }

    /**
     * get
     */
    get(route, handler) {
        this.addRoute('GET', route, handler);
    }

    /**
     * post
     */
    post(route, handler) {
        this.addRoute('POST', route, handler);
    }

    /**
     * put
     */
    put(route, handler) {
        this.addRoute('PUT', route, handler);
    }

    /**
     * delete
     */
    delete(route, handler) {
        this.addRoute('DELETE', route, handler);
    }

    /**
     * patch
     */
    patch(route, handler) {
        this.addRoute('PATCH', route, handler);
    }

    /**
     * head
     */
    head(route, handler) {
        this.addRoute('HEAD', route, handler);
    }

    /**
     * options
     */
    options(route, handler) {
        this.addRoute('OPTIONS', route, handler);
    }

    /**
     * @inheritdoc
     */
    handlerException(response, exception) {
        let handler = Fate.createObject(this.exceptionHandler);

        handler.handlerException(response, exception);
    }

}

/**
 * class and method separate
 */
Application.separator = '@';

module.exports = Application;
