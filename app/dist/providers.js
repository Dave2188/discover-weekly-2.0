// app/providers.tsx
"use client";
"use strict";
exports.__esModule = true;
exports.Providers = void 0;
var react_1 = require("react");
var next_js_1 = require("@chakra-ui/next-js");
var react_2 = require("@chakra-ui/react");
var userContext_1 = require("./context/userContext");
var navBar_1 = require("./components/navBar");
var react_query_1 = require("react-query");
var devtools_1 = require("react-query/devtools");
var twentyFourHoursInMs = 1000 * 60 * 60 * 24;
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: twentyFourHoursInMs
        }
    }
});
function Providers(_a) {
    var children = _a.children;
    return (react_1["default"].createElement(next_js_1.CacheProvider, null,
        react_1["default"].createElement(react_2.ChakraProvider, null,
            react_1["default"].createElement(react_query_1.QueryClientProvider, { client: queryClient },
                react_1["default"].createElement(userContext_1.UserProvider, null,
                    react_1["default"].createElement(navBar_1["default"], null),
                    children),
                react_1["default"].createElement(devtools_1.ReactQueryDevtools, { initialIsOpen: false })))));
}
exports.Providers = Providers;
