/**
 * CodeWars Link Creator
 *
 * Author: Aleksandr Kireev
 * E-mail: hello@createdby.ru
 * Site: https://createdby.ru
 */

import {logMessage} from "./helper.js";

/**
 * Функция для создания ссылки
 *
 * @returns {null|string}
 */
function createLink() {
    const h4Element = document.querySelector('h4.ml-2.mb-3');
    if (h4Element) {
        logMessage('Element found: ' + h4Element);
        let str = h4Element.innerText;
        logMessage('Original text: ' + str);
        str = str.replace(/[^a-zA-Z0-9\-\s]+/g, '');
        logMessage('After removing special characters: ' + str);
        str = str.replace(/\s/g, '-');
        logMessage('After replacing spaces with dashes: ' + str);
        str = str.toLowerCase();
        logMessage('After converting to lowercase: ' + str);
        return 'https://www.codewars.com/kata/' + str;
    } else {
        logMessage('No element found');
        return null;
    }
}

/**
 * Обработчик сообщений от popup
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'createLink') {
        console.log('Message received from popup.');
        const link = createLink();
        sendResponse({link});
    }
});

/**
 * Обработка сообщений от фонового скрипта
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'copyUrl') {
        const url = createLink();
        if (url) {
            navigator.clipboard.writeText(url).then(() => {
                logMessage('Text copied to clipboard: ' + url);
                alert('Link copied to clipboard: ' + url);
            }).catch(err => {
                logMessage('Failed to copy text to clipboard: ' + err, 'error');
            });
        } else {
            logMessage('No URL to copy');
        }
    }
});
