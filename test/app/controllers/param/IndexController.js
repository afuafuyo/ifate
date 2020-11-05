'use strict';

const Fate = require('../../../../Fate');
const Request = Fate.include('fate/http/Request');

class IndexController {

    run(req, res) {
        let name = new Request(req).getQueryString('name');

        res.end(name);
    }

}

module.exports = IndexController;
