'use strict';

const Fate = require('../../../Fate');
const Controller = Fate.include('fate/web/Controller');

class Demo extends Controller {

    run(req, res) {
        res.end('restful class ok');
    }

    testParam(req, res, params) {
        res.end(params.id);
    }

}

module.exports = Demo;
