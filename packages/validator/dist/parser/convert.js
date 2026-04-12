"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJson = toJson;
exports.toYaml = toYaml;
exports.toToon = toToon;
const yaml_1 = require("yaml");
function toJson(spec) {
    return JSON.stringify(spec, null, 2);
}
function toYaml(spec) {
    return (0, yaml_1.stringify)(spec);
}
function toToon(_spec) {
    throw new Error('TOON format requires @toon-format/toon package.');
}
//# sourceMappingURL=convert.js.map