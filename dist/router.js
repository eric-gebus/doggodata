"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const doggo = (0, express_1.Router)();
doggo.post("/new-message", controller_1.bark);
exports.default = doggo;
