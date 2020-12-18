'use strict';

var Fate = require('../../../../Fate');
var Controller = Fate.include('fate/web/Controller');

class IndexController extends Controller {

    beforeAction(actionEvent) {
        actionEvent.valid = false;

        setTimeout(() => {
            this.myrun(actionEvent.request, actionEvent.response);
        }, 1000);
    }

    myrun(req, res) {
        res.end('before action call');
    }

}

module.exports = IndexController;
