// node >= 10.0.0

const request = require('supertest');
const assert = require('assert');

const FateJs = require('../index');
const App = require('../web/Application');

const app = new App({
    'id': 1,
    'appPath': __dirname + '/app',
    'debug': true,

    'translator': {
        'fileBased': {
            classPath: 'fate/i18n/file/Translator',
            basePath: __dirname + '/app/i18n'
        }
    }
});
const server = new FateJs(app).getServer();


// test mvc
describe('I18N', () => {
    it('zh-CN', (done) => {
        request(server)
            .get('/i18n?lang=cn')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text.trim(), '你好 世界');

                done();
            });
    });

    it('en-US', (done) => {
        request(server)
            .get('/i18n?lang=en')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text.trim(), 'hello world');

                done();
            });
    });

    it('with param', (done) => {
        request(server)
            .get('/i18n?param=123&lang=en')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text.trim(), 'hello world 123');

                done();
            });
    });
});
