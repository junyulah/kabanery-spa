'use strict';

let {
    router, queryPager
} = require('../../../');

let {
    n, mount
} = require('kabanery');

let assert = require('assert');

mount(n('div id="pager"'), document.body); // pager as contauner

let {
    forward
} = router(queryPager({
    'page1': {
        render: () => {
            return n('div href="single://?page=page2"', {
                style: {
                    backgroundColor: 'blue'
                }
            }, [n('div id="btn"')]);
        }
    },

    'page2': {
        render: () => {
            return n('div', 'page 2');
        }
    }
}, 'page1'));

module.exports = forward(window.location.href).then(() => {
    document.getElementById('btn').click();
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                assert.equal(document.getElementById('pager').innerHTML, '<div>page 2</div>');
                resolve();
            } catch (err) {
                reject(err);
            }
        }, 50);
    });
});
