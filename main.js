// ==UserScript==
// @name         kutt.appinn.net Demon Mirror
// @namespace    jerryshell
// @version      0.1
// @description  小众软件短链还原
// @author       github.com/jerryshell
// @match        *://www.appinn.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=appinn.com
// @grant        GM_xmlhttpRequest
// @connect      kutt.appinn.net
// @license      GNU Affero General Public License v3.0
// ==/UserScript==

/* jshint esversion: 6 */

(() => {
    'use strict';
    const aElementList = document.querySelectorAll('a');
    if (aElementList) {
        const kuttAElementList = [...aElementList].filter(aElement => aElement.textContent.startsWith('https://kutt.appinn.net/'));
        if (kuttAElementList) {
            kuttAElementList.forEach(kuttAElement => {
                const href = kuttAElement.href;
                console.log('href', href);
                GM_xmlhttpRequest({
                    method: 'HEAD',
                    url: href,
                    fetch: true,
                    onerror: (error) => {
                        const realUrl = error.error.split('"')[1];
                        kuttAElement.textContent = realUrl;
                        kuttAElement.href = realUrl;
                    },
                });
            });
        }
    }
})();
