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
            return n('div', 'page1');
        }
    },

    'page2': {
        render: () => {
            return n('div', 'page2');
        }
    }
}, 'page1'));

module.exports = forward(window.location.href).then(() => {
    return forward('?page=page2');
}).then(() => {
    assert.equal(window.location.search, '?page=page2');
});
