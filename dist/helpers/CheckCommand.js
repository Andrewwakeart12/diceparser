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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatIdentity_1 = __importDefault(require("../models/ChatIdentity"));
const DBManager_1 = __importDefault(require("./DBManager"));
class CheckCommand {
    constructor(initialization_str, chat_id, processed_array) {
        this.final_str = '';
        this.initialization_str = initialization_str;
        this.chat_id = chat_id;
        this.processed_array = processed_array;
    }
    process_str() {
        return __awaiter(this, void 0, void 0, function* () {
            let regExp = /rr/;
            if (regExp.test(this.initialization_str)) {
                this.initialization_str = this.initialization_str.replace(/!rr/, '');
                var str_array = this.initialization_str.split(' ');
                var i = 0;
                do {
                    if (str_array[i] === '') {
                        str_array[i] = null;
                    }
                    i++;
                } while (i < str_array.length);
                str_array = str_array.filter(Boolean);
                this.processed_array = str_array;
            }
            else {
                this.processed_array = [];
            }
            return yield this.registerGame();
        });
    }
    get_register_name() {
        let i = 0;
        let first_bucle = true;
        console.log("this.processed_array");
        console.log(this.processed_array);
        while (i <= this.processed_array.length - 1 && this.processed_array.length != 0) {
            if (first_bucle) {
                this.final_str = String(this.processed_array[i]);
                first_bucle = false;
            }
            else {
                this.final_str += " " + String(this.processed_array[i]);
            }
            i++;
        }
        ;
        console.log(this.final_str);
    }
    registerGame() {
        return __awaiter(this, void 0, void 0, function* () {
            this.get_register_name();
            if (typeof (this.chat_id) != "undefined" && this.processed_array.length != 0) {
                var db = new DBManager_1.default();
                db = db.connection;
                var CI = yield ChatIdentity_1.default.findOne({ chat_id: this.chat_id }).exec();
                console.log(CI);
                return { result: this.final_str };
            }
            else {
                return { error: true, msg: 'Error al intentar ejecutar comando : falta de identificador de chat' };
            }
        });
    }
    setChatId(chat_id) {
        this.chat_id = chat_id;
    }
}
exports.default = CheckCommand;
