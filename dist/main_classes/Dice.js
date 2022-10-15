"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DiceRoller_1 = __importDefault(require("../helpers/DiceRoller"));
class Dice {
    constructor(msg) {
        this.selector = "%";
        this.check_sum = 0;
        this.dice_arr = [{ dice: [] }];
        this.msg = msg;
    }
    process_message_to_dice_arr() {
        this.msg = this.msg.replace(this.selector, '');
        if (this.msg.includes("+")) {
            var arr = this.msg.split('+');
            var bucle_start = true;
            arr.forEach((e) => {
                if (bucle_start === true) {
                    this.dice_arr[0] = { dice: e.split('d') };
                    bucle_start = false;
                }
                else {
                    if (e.includes('d')) {
                        this.dice_arr.push({ dice: e.split('d') });
                    }
                    else {
                        if (Number(e) != NaN) {
                            this.check_sum += Number(e);
                        }
                        console.log(this.check_sum);
                    }
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
        roller.optional_sum_param = this.check_sum;
        roller.roll_dice();
        return roller.give_answer_string();
    }
}
exports.default = Dice;
