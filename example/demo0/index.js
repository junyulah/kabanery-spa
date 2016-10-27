'use strict';

let {
    n
} = require('kabanery');

let {
    router, queryPager
} = require('../../index.js');

document.body.appendChild(n('div id="pager"'));

let {
    forward
} = router(queryPager({
    'page1': {
        render: () => {
            return n('div href="single://?page=page2"', {
                style: {
                    backgroundColor: 'blue'
                }
            },[
                n('div', 'hello1'),
                n('button', 'test'),
                n('button', {
                    onclick: (e) => {
                        e.stopPropagation();
                    }
                },'test2')
            ]);
        },
        title: 'article list'
    },

    'page2': {
        render: () => {
            return n('div', 'hello2');
        }
    }
}, 'page1'));

forward(window.location.href);
