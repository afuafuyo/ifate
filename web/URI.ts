/**
 * Universal Resource Identifier
 *
 * @see https://tools.ietf.org/html/rfc3986
 *
 * URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
 *
 * eg.
 *
 * foo://user:password@example.com:8000/over/there?name=ferret#nose
 * \_/   \____________________________/ \________/ \_________/ \__/
 *  |                   |                   |           |        |
 * scheme           authority              path       query   fragment
 *
 */
class URI {

    /**
     * 协议
     */
    public scheme: string = '';

    /**
     * 主机
     */
    public host: string = '';

    /**
     * 端口号
     */
    public port: string = '';

    /**
     * 用户
     */
    public user: string = '';

    /**
     * 密码
     */
    public password: string = '';

    /**
     * 资源路径
     */
    public path: string = '';

    /**
     * 请求参数
     */
    public query: string = '';

    /**
     * 锚点
     */
    public fragment: string = '';

    /**
     * 正则表达式
     */
    public uriRegExp: RegExp = new RegExp([
        // (scheme)
        '(http|https)?',
        // ://
        '(?::\\/\\/)?',
        // (user):(password)@
        '(?:([^:@\\/]*):?([^:@\\/]*)@)?',
        // (host):(port)
        '([^:\\/?#]*)(?::(\\d*))?',
        // (path)
        '((?:\\/)?[^?#]*)',
        // ?(query)
        '(?:\\?([^#]*))?',
        // #(fragment)
        '(?:#(.*))?'
    ].join(''));

    /**
     * 正则表达式匹配项
     */
    public uriRegExpKeys: string[] = [
        'source',
        'scheme',
        'user',
        'password',
        'host',
        'port',
        'path',
        'query',
        'fragment'
    ];

    constructor() {}

    /**
     * 创建一个 uri
     *
     * @param {String} scheme
     * @param {String} authority
     * @param {String} path
     * @param {String} query
     * @param {String} fragment
     * @return {String}
     */
    public createURIString(scheme: string = '', authority: string = '', path: string = '', query: string = '', fragment: string = ''): string {
        let uri = '';

        if('' !== scheme) {
            uri += scheme + '://';
        }
        if('' !== authority) {
            uri += authority;
        }
        if('' !== path) {
            if('/' !== path.charAt(0)) {
                path = '/' + path;
            }

            uri += path;
        }
        if('' !== query) {
            uri += '?' + query;
        }
        if('' !== fragment) {
            uri += '#' + fragment;
        }

        return uri;
    }

    /**
     * 设置 uri
     *
     * @param {String} uri
     */
    public setURI(uri: string): void {
        let ret = this.parseUrl(uri);

        if(undefined !== ret.scheme) {
            this.scheme = ret.scheme;
        }
        if(undefined !== ret.host) {
            this.host = ret.host;
        }
        if(undefined !== ret.port) {
            this.port = ret.port;
        }
        if(undefined !== ret.user) {
            this.user = ret.user;
        }
        if(undefined !== ret.password) {
            this.password = ret.password;
        }
        if(undefined !== ret.path) {
            this.path = ret.path;
        }
        if(undefined !== ret.query) {
            this.query = ret.query;
        }
        if(undefined !== ret.fragment) {
            this.fragment = ret.fragment;
        }
    }

    /**
     * 解析 url
     *
     * @param {String} url
     * @return {any}
     */
    public parseUrl(url: string): any {
        let ret = {};

        let matches = url.match(this.uriRegExp);

        if(null !== matches) {
            for(let i=0,len=this.uriRegExpKeys.length; i<len; i++) {
                ret[this.uriRegExpKeys[i]] = matches[i];
            }
        }

        return ret;
    }

    /**
     * 解析 URI 的 authority 部分
     *
     * @return {String}
     */
    public getAuthority(): string {
        let authority = '';

        if('' !== this.user) {
            authority += this.user + ':' + this.password + '@';
        }

        authority += this.host;

        if('' !== this.port) {
            authority += ':' + this.port;
        }

        return authority;
    }

    /**
     * 转为字符串
     */
    public toString(): string {
        return this.createURIString(
            this.scheme,
            this.getAuthority(),
            this.path,
            this.query,
            this.fragment
        );
    }

}

export = URI;
