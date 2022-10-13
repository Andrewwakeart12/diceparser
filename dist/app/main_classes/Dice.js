"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DiceRoller_1 = __importDefault(require("../helpers/DiceRoller"));
class Dice {
    constructor(msg) {
        this.selector = "%";
        this.msg = msg;
    }
    process_message_to_dice_arr() {
        this.msg = this.msg.replace(this.selector, '');
        if (this.msg.includes("+")) {
            var arr = this.msg.split('+');
            arr.forEach(e => {
                if (e.includes('d')) {
                    let temp_d_array = { dice: e.split('d') };
                    console.log("temp_d_array");
                    console.log(temp_d_array);
                    this.dice_arr.push(temp_d_array);
                }
            });
        }
        else if (this.msg.includes('d')) {
            this.dice_arr = [{ dice: this.msg.split('d') }];
        }
        else {
            return null;
        }
    }
    execute_roll() {
        this.process_message_to_dice_arr();
        let roller = new DiceRoller_1.default(this.dice_arr);
        roller.roll_dice();
        return roller.give_answer_string();
    }
}
exports.default = Dice;
