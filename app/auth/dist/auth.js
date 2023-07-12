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
exports.getToken = exports.getRedirect = exports.generateCodeChallenge = exports.generateRandomString = void 0;
var client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
var redirect_uri = "http://localhost:3000/";
var codeVerifier = generateRandomString(128);
function generateRandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.generateRandomString = generateRandomString;
function generateCodeChallenge() {
    return __awaiter(this, void 0, void 0, function () {
        function base64encode(buffer) {
            var bytes = new Uint8Array(buffer);
            var binary = "";
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
        }
        var encoder, data, digest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encoder = new TextEncoder();
                    data = encoder.encode(codeVerifier);
                    return [4 /*yield*/, crypto.subtle.digest("SHA-256", data)];
                case 1:
                    digest = _a.sent();
                    return [2 /*return*/, base64encode(digest)];
            }
        });
    });
}
exports.generateCodeChallenge = generateCodeChallenge;
function getRedirect() {
    return __awaiter(this, void 0, void 0, function () {
        var state, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, generateRandomString(16)];
                case 1:
                    state = _a.sent();
                    return [4 /*yield*/, generateCodeChallenge().then(function (codeChallenge) {
                            var scope = "user-read-private user-read-email";
                            var args = new URLSearchParams({
                                response_type: "code",
                                client_id: client_id,
                                scope: scope,
                                redirect_uri: redirect_uri,
                                state: state,
                                code_challenge_method: "S256",
                                code_challenge: codeChallenge
                            });
                            return "https://accounts.spotify.com/authorize?" + args;
                        })];
                case 2:
                    url = _a.sent();
                    return [2 /*return*/, [url, codeVerifier]];
            }
        });
    });
}
exports.getRedirect = getRedirect;
function getToken(code, code_verifier, client_id) {
    return __awaiter(this, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = new URLSearchParams({
                        grant_type: "authorization_code",
                        code: code,
                        redirect_uri: redirect_uri,
                        client_id: client_id,
                        code_verifier: code_verifier
                    });
                    return [4 /*yield*/, fetch("https://accounts.spotify.com/api/token", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: body
                        })
                            .then(function (response) {
                            if (!response.ok) {
                                throw new Error("HTTP status " + response.status);
                            }
                            return response.json();
                        })
                            .then(function (data) {
                            return data;
                        })["catch"](function (error) {
                            console.error("Error:", error);
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getToken = getToken;
