'use strict';

const Controller = require('../../../../../web/Controller');

class IndexController extends Controller {
    run(req, res) {
        this.getView().getViewContent('index', (err, str) => {
            res.end(str);
        });
    }
}

module.exports = IndexController;
