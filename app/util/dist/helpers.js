"use strict";
exports.__esModule = true;
exports.removeLocalStorage = exports.setLocalStorage = exports.getLocalStorage = void 0;
exports.getLocalStorage = function (key) {
    return (typeof window !== "undefined" && localStorage.getItem(key)) || "";
};
exports.setLocalStorage = function (key, value) {
    return (typeof window !== "undefined" && localStorage.setItem(key, value)) || "";
};
exports.removeLocalStorage = function (key) {
    return typeof window !== "undefined" && localStorage.removeItem(key);
};
