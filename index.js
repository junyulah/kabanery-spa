'use strict';

module.exports = require('./src');

/**
 * @readme-quick-run
 *
 * ## test tar=js env=browser r_c=spa
 *
 * let {router, queryPager} = spa;
 * let {n} = require('kabanery');
 * document.body.appendChild(n('div id="pager"')); // pager as contauner
 *
 * let {forward} = router(queryPager({
 *      'page1': {
 *          title: 'page1',
 *          render: () => {
 *              return n('div', 'this is page1');
 *          }
 *      },
 *      'page2': {
 *          render: () => {
 *              return n('div', 'this is page2');
 *          }
 *      }
 * }, 'page1')); // default page is page1
 *
 * module.exports = forward(window.location.href).then(() => {
 *    console.log('page 1 content: ');
 *    console.log(document.getElementById('pager').innerHTML);
 *    return forward('?page=page2').then(() => {
 *      console.log('\n\npage 2 content: ');
 *      console.log(document.getElementById('pager').innerHTML);
 *    });
 * });
 */
