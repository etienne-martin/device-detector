"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const YAML = require("js-yaml");
const fs = require("fs");
const loadYaml = (slug) => {
    return YAML.load(fs.readFileSync(slug, "utf8"), {
        schema: YAML.FAILSAFE_SCHEMA
    });
};
exports.loadRegexes = (slug) => {
    return loadYaml(`${path.resolve(__dirname)}/../../node_modules/device-detector/regexes/${slug}.yml`);
};
exports.loadTests = (slug) => {
    return loadYaml(`${path.resolve(__dirname)}/../../node_modules/device-detector/Tests/${slug}.yml`);
};
