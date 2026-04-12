"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectFormat = detectFormat;
function detectFormat(raw) {
    const trimmed = raw.trimStart();
    if (trimmed.startsWith('{') || trimmed.startsWith('['))
        return 'json';
    if (/\[\d+,?\]\{/.test(raw))
        return 'toon';
    return 'yaml';
}
//# sourceMappingURL=detect.js.map