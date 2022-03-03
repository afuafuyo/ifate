'use strict';

const Controller = require('../../../../web/Controller');
const Request = require('../../../../http/Request');

class IndexController extends Controller {

    run(req, res) {
        let p = new Request(req).getQueryString('p1');

        this.getView().getViewContent('index', (err, str) => {
            res.end(str.trim() + ' ' + p);
        });
    }

}

module.exports = IndexController;
