"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const currencySchema = new mongoose_1.Schema({
    chat_id: { type: String, required: true },
    name: { type: String, required: true },
    symbol: Array,
});
const Currency = (0, mongoose_1.model)('Currency', currencySchema);
exports.default = Currency;
