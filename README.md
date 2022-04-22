# 一个面向对象的高效 node.js mvc and REST 框架

### Node 版本

8.0.0 及以上

### 源码 source code

+ https://github.com/afuafuyo/ifate

### 说明

ifate 是从 ynode 更名而来的项目

### 为什么是 IFate

+ IFate 实现了 MVC (Model-View-Controller) 设计模式并基于该模式组织代码

+ IFate 实现了自动路由映射

+ IFate 高可扩展和高可配置

+ IFate 的代码简洁优雅 这是它的编程哲学

### 示例 Hello world

使用 IFate 你只需要从一个入口文件开始，入口文件的内容可以使用自带的工具来生成，详情参见 doc 目录中的文档

```javascript
var IFate = require('ifate');
var App = require('ifate/web/Application');

var app = new App({
    'id': 1,

    // 定义调试应用
    'debug': true,

    // 定义应用路径
    'appPath': __dirname + '/app'

});

new IFate(app).listen(8090, function(){
    console.log('listen on 8090');
});
```

### 系统内置别名

+ @fate  系统目录

+ @app  项目目录 由 appPath 指定 `Fate.app.getAppPath()` 可得到该值

+ @runtime  缓存目录 默认指向 @app/runtime `Fate.app.getRuntimePath()` 可得到该值

### 项目目录示例

<pre>
|- index.js
|
|- node_modules 目录
|
|- public 目录
|
|- app 项目目录
|   |
|   |-- apis
|   |
|   |-- controllers 普通控制器目录
|       |
|       |-- user 用户组目录
|       |   |
|       |   |-- IndexController.js
|       |   |-- OtherController.js
|       |
|       |-- goods 商品组目录
|       |   |
|       |   |-- IndexController.js
|       |   |-- OtherController.js
|       |
|   -- views 普通控制器模板目录
|       |
|       |-- user 用户组模板 对应上面用户组
|       |   |
|       |   |-- index.html
|       |   |-- other.html
|       |
|   -- goods 商品组模板
|       |   |
|       |   |-- index.html
|       |   |-- other.html
|       |
|   -- modules 模块
|       |
|       |-- reg
|       |   |
|       |   |-- controllers 模块控制器目录 其下无子目录
|       |   |   |
|       |   |   |-- IndexController.js
|       |   |
|       |   |-- views 模块模板目录
|       |   |   |
|       |   |   |-- index.html
|       |   |
|       |   |-- 其他目录
|       |
|   -- runtime 缓存目录
|
</pre>

### 版本更新

+ 2020-11-05

    * 从 ynode 更名

