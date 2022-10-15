"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const currencySchema = new mongoose_1.Schema({
    character_id: { type: Number, required: true },
    chat_id: { type: String, required: true },
    name: { type: String, required: true },
    damage: String,
    value: String
});
const Item = (0, mongoose_1.model)('Currency', currencySchema);
exports.default = Item;
