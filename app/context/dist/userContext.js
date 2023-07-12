"use strict";
exports.__esModule = true;
exports.UserProvider = exports.UserContext = void 0;
var react_1 = require("react");
exports.UserContext = react_1.createContext({});
exports.UserProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState({}), user = _b[0], setUser = _b[1];
    return react_1["default"].createElement(exports.UserContext.Provider, { value: { user: user, setUser: setUser } }, children);
};
