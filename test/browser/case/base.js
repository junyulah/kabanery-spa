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
        },

        title: 'page1'
    },

    'page2': {
        render: () => {
            return n('div', 'page2');
        },
        title: 'page2'
    }
}, 'page1'));

module.exports = forward(window.location.href).then(() => {
    // default page
    assert.equal(document.title, 'page1');
    assert.equal(document.getElementById('pager').innerHTML, '<div>page1</div>');

    // jump through forward api
    return forward('?page=page2').then(() => {
        assert.equal(document.getElementById('pager').innerHTML, '<div>page2</div>');
        assert.equal(document.title, 'page2');

        return forward('?page=page1').then(() => {
            assert.equal(document.getElementById('pager').innerHTML, '<div>page1</div>');
            assert.equal(document.title, 'page1');
        });
    });
});
