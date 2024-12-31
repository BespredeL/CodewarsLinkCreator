/**
 * CodeWars Link Creator
 *
 * Author: Aleksandr Kireev
 * E-mail: hello@createdby.ru
 * Site: https://createdby.ru
 */

import {logMessage, copyToClipboard} from "./helper.js";


/**
 * Функция для получения ссылки
 *
 * @param {boolean} copy - Указывает, нужно ли копировать ссылку
 *
 * @returns {null}
 */
function getLink(copy = false) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        const tabId = tabs[0]?.id;
        if (tabId) {
            chrome.tabs.sendMessage(tabId, {action: 'createLink'}, function (response) {
                const text = document.getElementById('task-link');
                if (chrome.runtime.lastError) {
                    text.value = 'Ошибка: невозможно создать ссылку';
                    logMessage(`Runtime error: ${chrome.runtime.lastError.message}`, 'error');
                    return;
                }

                if (response && response.link) {
                    logMessage('Link created: ' + response.link);
                    text.value = response.link;

                    // Копирование ссылки только если указан флаг copy
                    if (copy) {
                        copyToClipboard(response.link);
                    }
                } else {
                    text.value = 'Ошибка: невозможно создать ссылку';
                    logMessage('No link created', 'error');
                }
            });
        } else {
            logMessage('Active tab not found', 'error');
        }
    });
}

/**
 * Добавление обработчика для кнопки создания ссылки
 */
document.addEventListener('DOMContentLoaded', function () {
    // Получение ссылки при загрузке popup
    getLink(true);

    // Обработчик нажатия на кнопку
    const createLinkButton = document.getElementById('create-link');
    if (createLinkButton) {
        createLinkButton.addEventListener('click', function () {
            getLink();
        });
    } else {
        logMessage('Button element not found');
    }
});


/**
 * Добавление обработчика для кнопки копирования ссылки
 */
document.addEventListener('DOMContentLoaded', function () {
    const createLinkButton = document.getElementById('copy-link');

    // Обработчик нажатия на кнопку
    if (createLinkButton) {
        createLinkButton.addEventListener('click', function () {
            let textElem = document.getElementById('task-link');
            let url = textElem.value;
            if (!url) {
                logMessage('No URL to copy');
                return;
            }

            // Отправка ссылки в буфер обмена
            copyToClipboard(url);
        });
    } else {
        logMessage('Button element not found');
    }
});