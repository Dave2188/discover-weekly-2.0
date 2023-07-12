"use strict";
exports.__esModule = true;
exports.metadata = void 0;
require("./globals.css");
var google_1 = require("next/font/google");
var providers_1 = require("./providers");
var react_1 = require("react");
var inter = google_1.Inter({ subsets: ["latin"] });
exports.metadata = {
    title: "Create Next App",
    description: "Generated by create next app"
};
function RootLayout(_a) {
    var children = _a.children;
    return (react_1["default"].createElement("html", { lang: "en" },
        react_1["default"].createElement("body", { className: inter.className },
            react_1["default"].createElement(providers_1.Providers, null, children))));
}
exports["default"] = RootLayout;
