"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* eslint-disable no-unused-vars */
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var icons_1 = require("@chakra-ui/icons");
var userContext_1 = require("../context/userContext");
var auth_1 = require("../auth/auth");
var navigation_1 = require("next/navigation");
var react_query_1 = require("react-query");
var profile_1 = require("../api/profile");
// import { getProfile } from "../api/profile";
var Links = ["Dashboard", "Projects", "Team"];
var NavLink = function (_a) {
    var children = _a.children, href = _a.href;
    return (React.createElement(react_2.Link, { px: 2, py: 1, rounded: "md", _hover: {
            textDecoration: "none",
            bg: react_2.useColorModeValue("gray.200", "gray.700")
        }, href: href }, children));
};
function Navar() {
    var _this = this;
    var _a, _b;
    var code;
    var verifier;
    if (typeof window !== "undefined") {
        var urlParams = new URLSearchParams(window.location.search);
        code = urlParams.get("code");
        verifier = localStorage.getItem("code_verifier");
    }
    var _c = react_2.useDisclosure(), isOpen = _c.isOpen, onOpen = _c.onOpen, onClose = _c.onClose;
    var _d = react_2.useColorMode(), colorMode = _d.colorMode, toggleColorMode = _d.toggleColorMode;
    var router = navigation_1.useRouter(); // @ts-expect-error
    var _e = react_1.useContext(userContext_1.UserContext), user = _e.user, setUser = _e.setUser;
    var data = react_query_1.useQuery(["token"], function () { return __awaiter(_this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(code && verifier)) return [3 /*break*/, 2];
                    return [4 /*yield*/, auth_1.getToken(code, localStorage.getItem("code_verifier"), process.env.NEXT_PUBLIC_CLIENT_ID)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/];
            }
        });
    }); }, {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 0,
        onSuccess: function (data) {
            console.log("onSuccess data:", data); // log the data
            if (!data)
                return;
            console.log("Storing tokens in localStorage");
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.removeItem("code_verifier");
            router.replace("/");
            profile_1.getProfile().then(function (data) { return setUser(data); });
        },
        onError: function () {
            alert();
        }
    }).data;
    var handleSignIn = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, url, code_verifier;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, auth_1.getRedirect()];
                case 1:
                    _a = _b.sent(), url = _a[0], code_verifier = _a[1];
                    window.localStorage.setItem("code_verifier", code_verifier);
                    return [2 /*return*/, router.push(url)];
            }
        });
    }); };
    console.log(user);
    return (React.createElement(React.Fragment, null,
        React.createElement(react_2.Box, { bg: react_2.useColorModeValue("gray.100", "black"), px: 4 },
            React.createElement(react_2.Flex, { h: 16, alignItems: "center", justifyContent: "space-between" },
                React.createElement(react_2.IconButton, { size: "md", icon: isOpen ? React.createElement(icons_1.CloseIcon, null) : React.createElement(icons_1.HamburgerIcon, null), "aria-label": "Open Menu", display: { md: "none" }, onClick: isOpen ? onClose : onOpen }),
                React.createElement(react_2.HStack, { spacing: 8, alignItems: "center" },
                    React.createElement(react_2.Box, null, user.display_name),
                    React.createElement(react_2.HStack, { as: "nav", spacing: 4, display: { base: "none", md: "flex" } },
                        React.createElement(NavLink, { href: "#" }, ((_a = user === null || user === void 0 ? void 0 : user.followers) === null || _a === void 0 ? void 0 : _a.total) + " Followers"),
                        React.createElement(NavLink, { href: "" + ((_b = user === null || user === void 0 ? void 0 : user.external_urls) === null || _b === void 0 ? void 0 : _b.spotify) }, "My Spotify"))),
                React.createElement(react_2.Flex, { alignItems: "center" },
                    React.createElement(react_2.Button, { margin: 5, onClick: toggleColorMode }, colorMode === "light" ? React.createElement(icons_1.MoonIcon, null) : React.createElement(icons_1.SunIcon, null)),
                    user.display_name ? (React.createElement(react_2.Menu, null,
                        React.createElement(react_2.MenuButton, { as: react_2.Button, rounded: "full", variant: "link", cursor: "pointer", minW: 0 },
                            React.createElement(react_2.Avatar, { size: "md", src: user === null || user === void 0 ? void 0 : user.images[1].url })),
                        React.createElement(react_2.MenuList, null,
                            React.createElement(react_2.MenuItem, null, "Link 1"),
                            React.createElement(react_2.MenuItem, null, "Link 2"),
                            React.createElement(react_2.MenuDivider, null),
                            React.createElement(react_2.MenuItem, null, "Link 3")))) : (React.createElement(react_2.Button, { onClick: handleSignIn }, "Sign in")))),
            isOpen ? (React.createElement(react_2.Box, { pb: 4, display: { md: "none" } },
                React.createElement(react_2.Stack, { as: "nav", spacing: 4 }, Links.map(function (link) { return (React.createElement(NavLink, { href: "#", key: link }, link)); })))) : null)));
}
exports["default"] = Navar;
