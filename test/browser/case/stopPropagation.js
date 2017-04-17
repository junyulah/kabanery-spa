'use strict';

let {
    router, queryPager
} = require('../../../');

let {
    n
} = require('kabanery');

let assert = require('assert');

document.body.appendChild(n('div id="pager"')); // pager as contauner

let {
    forward
} = router(queryPager({
    'page1': {
        render: () => {
            return n('div href="single://?page=page2"', {
                style: {
                    backgroundColor: 'blue'
                }
            }, [
                n('div id="btn"', {
                    onclick: (e) => {
                        e.stopPropagation();
                    }
                })
            ]);
        }
    },

    'page2': {
        render: () => {
            return n('div', 'page2');
        }
    }
}, 'page1'));

module.exports = forward(window.location.href).then(() => {
    document.getElementById('btn').click();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                assert.equal(document.getElementById('pager').innerHTML, '<div href="single://?page=page2" style=";background-color: blue"><div id="btn"></div></div>');
            } catch (err) {
                reject(err);
            }
            resolve();
        }, 50);
    });
});
