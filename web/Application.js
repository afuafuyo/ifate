"use strict";
const Fate = require("../Fate");
const Request = require("../http/Request");
const CoreApp = require("../core/Application");
const StringHelper = require("../helpers/StringHelper");
const InvalidRouteException = require("../core/InvalidRouteException");
const Controller = require("./Controller");
class Application extends CoreApp {
    constructor(config) {
        super(config);
        this.interceptAll = null;
        this.routesMap = null;
        this.modules = null;
        this.defaultView = 'fate/web/View';
        this.defaultControllerNamespace = 'app/controllers';
        this.defaultRoute = 'index/index';
        this.defaultControllerId = 'index';
        Fate.configure(this, config);
    }
    requestListener(request, response) {
        let route = new Request(request).createURL().pathname;
        let controller = this.createController(route);
        if (null === controller) {
            throw new InvalidRouteException('The route requested is not found');
        }
        if (!(controller instanceof Controller)) {
            Reflect.apply(controller['run'], controller, [request, response]);
            return;
        }
        controller.context.request = request;
        controller.context.response = response;
        controller.runControllerAction(request, response);
    }
    handlerException(exception, response) {
        let handler = Fate.createObject(this.exceptionHandler, this);
        handler.handlerException(exception, response);
    }
    createController(route) {
        let moduleId = '';
        let controllerId = '';
        let viewPath = '';
        route = StringHelper.lTrimChar(route, '/');
        if ('' === route || '/' === route) {
            route = this.defaultRoute;
        }
        if (route.indexOf('//') >= 0) {
            return null;
        }
        if (null !== this.interceptAll) {
            return Fate.createObject(this.interceptAll);
        }
        let id = '';
        let pos = route.indexOf('/');
        if (-1 !== pos) {
            id = route.substring(0, pos);
            route = route.substring(pos + 1);
            controllerId = route;
        }
        else {
            id = route;
            route = '';
        }
        viewPath = id;
        if (-1 !== (pos = route.lastIndexOf('/'))) {
            viewPath = viewPath + '/' + route.substring(0, pos);
            controllerId = route.substring(pos + 1);
        }
        if ('' === controllerId) {
            controllerId = this.defaultControllerId;
        }
        let clazz = '';
        if (null !== this.routesMap && undefined !== this.routesMap[id]) {
            return Fate.createObject(this.routesMap[id], {
                application: this,
                moduleId: moduleId,
                controllerId: controllerId,
                viewPath: viewPath
            });
        }
        if (null !== this.modules && undefined !== this.modules[id]) {
            moduleId = id;
            clazz = StringHelper.trimChar(this.modules[id], '/')
                + '/controllers/'
                + StringHelper.ucFirst(controllerId) + 'Controller';
            return Fate.createObjectAsString(clazz, {
                application: this,
                moduleId: moduleId,
                controllerId: controllerId,
                viewPath: viewPath
            });
        }
        clazz = this.defaultControllerNamespace
            + '/'
            + viewPath
            + '/'
            + StringHelper.ucFirst(controllerId) + 'Controller';
        return Fate.createObjectAsString(clazz, {
            application: this,
            moduleId: moduleId,
            controllerId: controllerId,
            viewPath: viewPath
        });
    }
}
module.exports = Application;
