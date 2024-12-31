/**
 * CodeWars Link Creator
 *
 * Author: Aleksandr Kireev
 * E-mail: hello@createdby.ru
 * Site: https://createdby.ru
 */

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, {action: 'copyUrl'});
});