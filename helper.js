/**
 * CodeWars Link Creator
 *
 * Author: Aleksandr Kireev
 * E-mail: hello@createdby.ru
 * Site: https://createdby.ru
 */

// Параметры
const showConsoleLog = false;

/**
 * Функция для вывода сообщений в консоль
 *
 * @param message
 * @param type
 */
export function logMessage(message, type = 'info') {
    if (!showConsoleLog)
        return;

    const timestamp = new Date().toISOString();
    switch (type) {
        case 'error':
            console.error(`[${timestamp}] ERROR: ${message}`);
            break;

        case 'info':
        default:
            console.log(`[${timestamp}] INFO: ${message}`);
            break;
    }
}

/**
 * Функция для копирования ссылки
 *
 * @param text
 */
export function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        logMessage('Text copied to clipboard: ' + text);
        document.getElementById('copied-message').style.display = 'inline-block';
        setTimeout(function () {
            document.getElementById('copied-message').style.display = 'none';
        }, 1000);
    }).catch(err => {
        logMessage('Failed to copy text to clipboard: ' + err, 'error');
    });
}