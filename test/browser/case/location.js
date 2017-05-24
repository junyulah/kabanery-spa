'use strict';

let {
    router, queryPager
} = require('../../../');

let {
    delay
} = require('jsenhance');

let {
    n, mount
} = require('kabanery');

let assert = require('assert');

mount(n('div id="pager"'), document.body); // pager as contauner

let {
    forward, reload
} = router(queryPager({
    'page1': {
        render: () => {
            return n('div href="single://?page=page2"', {
                style: {
                    backgroundColor: 'blue',
                    height: 100000
                }
            }, [n('div id="btn"')]);
        }
    },

    'page2': {
        render: () => {
            return n('div', {
                style: {
                    backgroundColor: 'blue',
                    height: 100000
                }
            }, 'page 2');
        }
    }
}, 'page1'));

module.exports = forward(window.location.href).then(() => {
    window.scrollTo(0, 400);
    document.getElementById('btn').click();

    return delay(50).then(() => {
        assert.equal(window.scrollY, 0);
        window.scrollTo(0, 600);
        reload();
        return delay(50).then(() => {
            assert.equal(window.scrollY, 600);
            forward(window.location.href);
            return delay(150).then(() => {
                assert.equal(window.scrollY, 0);
            });
        });
    });
});
