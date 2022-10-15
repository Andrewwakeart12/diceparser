"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatIdentitySchema = new mongoose_1.Schema({
    chat_id: { type: String, required: true },
    campaing_name: { type: String, required: true },
});
const ChatIdentity = (0, mongoose_1.model)('ChatIdentity', chatIdentitySchema);
exports.default = ChatIdentity;
