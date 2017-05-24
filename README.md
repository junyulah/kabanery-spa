# kabanery-spa

[中文文档](./README_zh.md)   [document](./README.md)

A SPA framework based on kabanery
- [install](#install)
- [usage](#usage)
  * [API quick run](#api-quick-run)
- [develop](#develop)
  * [file structure](#file-structure)
  * [run tests](#run-tests)
- [license](#license)

## install

`npm i kabanery-spa --save` or `npm i kabanery-spa --save-dev`

Install on global, using `npm i kabanery-spa -g`



## usage








### API quick run



```js
let spa = require('kabanery-spa')
let {router, queryPager} = spa;
let {n, mount} = require('kabanery');
mount(n('div id="pager"'), document.body); // pager as contauner

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
output

    page 1 content: 
    <div>this is page1</div>
    
    
    page 2 content: 
    <div>this is page2</div>

```

## develop

### file structure

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


### run tests

`npm test`

## license

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
