"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const characterSchema = new mongoose_1.Schema({
    chat_id: { type: String, required: true },
    user_chat_id: { type: String, required: true },
    class: { type: String, required: true },
    name: { type: String, required: true },
    armor_class: Number,
    money: Number,
    items: Array,
});
const Character = (0, mongoose_1.model)('Character', characterSchema);
exports.default = Character;
