'use strict';

let {
    removeChilds
} = require('doming');

let {
    mount
} = require('kabanery');

let querystring = require('querystring');

let queryPager = (map = [], index) => {
    index = initDefaultPage(map, index);

    return (url) => {
        let qs = querystring.parse(url.split('?')[1] || '');
        let pageName = qs.page || index;

        return map[pageName];
    };
};

let restPager = (map = [], index) => {
    index = initDefaultPage(map, index);

    return (url) => {
        let pathname = url.split(/.*\:\/\//)[1];
        let pageName = pathname.split('/')[1];
        pageName = pageName || index;

        return map[pageName];
    };
};

let initDefaultPage = (map = [], index) => {
    if (index === null || index === undefined) {
        for (let name in map) {
            index = name;
            break;
        }
    }
    return index;
};

let renderPage = (render, pageEnv, title) => {
    return Promise.resolve(render(pageEnv)).then((pageNode) => {
        let pager = document.getElementById('pager');
        // unload old page
        removeChilds(pager);
        // add new page
        mount(pageNode, pager);
        pager.style = 'display:block;';
        document.title = title;
    });
};

/**
 * pager: (url) => {title, render}
 */
let router = (pager, pageEnv) => {
    let forward = (url) => {
        if (!window.history.pushState) {
            window.location.href = url;
            return;
        }
        let {
            render, title = '', transitionData = {}
        } = pager(url);

        if (url !== window.location.href) {
            window.history.pushState(transitionData, title, url);
        }
        return renderPage(render, pageEnv, title);
    };

    let redirect = (url) => {
        if (!window.history.pushState) {
            window.location.href = url;
            window.location.replace(url);
            return;
        }
        let {
            render, title = '', transitionData = {}
        } = pager(url);

        if (url !== window.location.href) {
            window.history.replaceState(transitionData, title, url);
        }
        return renderPage(render, pageEnv);
    };

    window.onpopstate = () => {
        forward(window.location.href);
    };

    document.addEventListener('click', (e) => {
        let target = e.target;
        let url = target.getAttribute('href');
        let prefix = 'single://';
        if (url && url.indexOf(prefix) === 0) {
            url = url.substring(prefix.length);
            forward(url);
        }
    }, true);

    return {
        forward,
        redirect,
        reload: () => {
            return forward(window.location.href);
        }
    };
};

module.exports = {
    router,
    queryPager,
    restPager
};
