'use strict';

const Fate = require('../../../../Fate');
const Controller = Fate.include('fate/web/Controller');

class IndexController extends Controller {

    run(req, res) {
        this.getView().getViewContent('index', (err, str) => {
            res.end(str);
        });
    }

}

module.exports = IndexController;
