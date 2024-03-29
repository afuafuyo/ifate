'use strict';

const Request = require('../../../../http/Request');
const I18N = require('../../../../i18n/I18N');

class IndexController {

    run(req, res) {
        let q = new Request(req);
        let param = q.getQueryString('param', '');
        let lang = q.getQueryString('lang', '');

        // 设置语言可以用过滤器方式添加 代码复用性更高
        let t = I18N.getTranslator('fileBased');
        t.setLanguage(lang === 'en' ? 'en-US' : 'zh-CN');

        let msg = t.translate('mytype', 'title', [param]);
        res.end(msg);
    }

}

module.exports = IndexController;
