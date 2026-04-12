"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectFormat = void 0;
exports.parse = parse;
const yaml_1 = require("yaml");
const detect_1 = require("./detect");
var detect_2 = require("./detect");
Object.defineProperty(exports, "detectFormat", { enumerable: true, get: function () { return detect_2.detectFormat; } });
function parse(raw, format) {
    const fmt = format ?? (0, detect_1.detectFormat)(raw);
    if (fmt === 'json')
        return JSON.parse(raw);
    if (fmt === 'yaml')
        return (0, yaml_1.parse)(raw);
    if (fmt === 'toon')
        throw new Error('TOON format requires @toon-format/toon package.');
    throw new Error(`Unknown format: ${fmt}`);
}
//# sourceMappingURL=parse.js.map