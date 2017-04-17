# kabanery-spa

[中文文档](./README_zh.md)   [document](./README.md)

一个基于kabanery的SPA框架
- [安装](#%E5%AE%89%E8%A3%85)
- [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
  * [API 快速运行](#api-%E5%BF%AB%E9%80%9F%E8%BF%90%E8%A1%8C)
- [开发](#%E5%BC%80%E5%8F%91)
  * [文件结构](#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
  * [运行测试用例](#%E8%BF%90%E8%A1%8C%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B)
- [许可证](#%E8%AE%B8%E5%8F%AF%E8%AF%81)

## 安装

`npm i kabanery-spa --save` 或者 `npm i kabanery-spa --save-dev`

全局安装, 使用 `npm i kabanery-spa -g`



## 使用方法








### API 快速运行



```js
let spa = require('kabanery-spa')
let {router, queryPager} = spa;
let {n} = require('kabanery');
document.body.appendChild(n('div id="pager"')); // pager as contauner

let {forward} = router(queryPager({
     'page1': {
         title: 'page1',
         render: () => {
             return n('div', 'this is page1');
         }
     },
     'page2': {
         render: () => {
             return n('div', 'this is page2');
         }
     }
}, 'page1')); // default page is page1

module.exports = forward(window.location.href).then(() => {
   console.log('page 1 content: ');
   console.log(document.getElementById('pager').innerHTML);
   return forward('?page=page2').then(() => {
     console.log('\n\npage 2 content: ');
     console.log(document.getElementById('pager').innerHTML);
   });
});
```

```
输出

    page 1 content: 
    <div>this is page1</div>
    
    
    page 2 content: 
    <div>this is page2</div>

```

## 开发

### 文件结构

```
.    
│──LICENSE    
│──README.md    
│──README_zh.md    
│──example    
│   └──demo0    
│       │──asset    
│       │   └──app.js    
│       │──index.html    
│       │──index.js    
│       └──webpack.config.js    
│──index.js    
│──package.json    
│──src    
│   └──index.js    
└──test    
    │──__test    
    └──browser     
```


### 运行测试用例

`npm test`

## 许可证

MIT License

Copyright (c) 2016 chenjunyu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
