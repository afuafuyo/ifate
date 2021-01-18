// node >= 6.0.0

const request = require('supertest');
const assert = require('assert');

const IFate = require('../index');
const Application = require('../web/Application');

const app = new Application({
    'id': 1,
    'appPath': __dirname + '/app',
    'debug': true,

    'interceptAll': 'app/Intercept',

    'modules': {
        'bbs': 'app/modules/bbs'
    }
});
const server = new IFate(app).getServer();

// test
describe('intercept routes', function() {
    it('a route', function(done) {
        request(server)
            .get('/aroute')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'intercepted');

                done();
            });
    });

    it('b route', function(done) {
        request(server)
            .get('/broute')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'intercepted');

                done();
            });
    });

});
