"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiceRoller {
    constructor(dice_arr) {
        this.optional_sum_param = 0;
        this.dice_arr = dice_arr;
    }
    roll_dice() {
        var limit_exceded = false;
        var bad_dice_format = false;
        let final_result_array_temp = { dice_ordered_by_type: [], dice_for_final_sum: [] };
        if (Array.isArray(this.dice_arr)) {
            if (this.dice_arr.length <= 8) {
                this.dice_arr.forEach((dice_inner_arr) => {
                    var _a, _b, _c, _d;
                    if (!Array.isArray(dice_inner_arr)) {
                        if (dice_inner_arr.dice[0] != '') {
                            if (dice_inner_arr.dice.length <= 2) {
                                var i = 0;
                                var temp_numb_1 = Math.abs(parseInt(dice_inner_arr.dice[0]));
                                var temp_numb_2 = Math.abs(parseInt(dice_inner_arr.dice[1]));
                                if (temp_numb_1 == NaN && temp_numb_2 === NaN) {
                                    bad_dice_format = true;
                                }
                                do {
                                    if (temp_numb_1 <= 100 && temp_numb_2 <= 100) {
                                        var dice_max = temp_numb_2 + 1;
                                        var random_num = Math.floor((Math.random() * (dice_max - 1)) + 1);
                                        var obj_to_dice = {};
                                        obj_to_dice[`d${dice_max - 1}`] = random_num;
                                        (_a = final_result_array_temp.dice_ordered_by_type) === null || _a === void 0 ? void 0 : _a.push(obj_to_dice);
                                        (_b = final_result_array_temp.dice_for_final_sum) === null || _b === void 0 ? void 0 : _b.push(random_num);
                                        i++;
                                    }
                                    else {
                                        limit_exceded = true;
                                        break;
                                    }
                                } while (i < temp_numb_1);
                            }
                            else {
                                bad_dice_format = true;
                            }
                        }
                        else {
                            if (dice_inner_arr.dice.length <= 2) {
                                temp_numb_1 = 1;
                                temp_numb_2 = Math.abs(parseInt(dice_inner_arr.dice[1]));
                                if (temp_numb_1 <= 100 && temp_numb_2 <= 100) {
                                    var dice_max = temp_numb_2 + 1;
                                    var random_num = Math.floor((Math.random() * (dice_max - 1)) + 1);
                                    var obj_to_dice = {};
                                    obj_to_dice[`d${dice_max - 1}`] = random_num;
                                    (_c = final_result_array_temp.dice_ordered_by_type) === null || _c === void 0 ? void 0 : _c.push(obj_to_dice);
                                    (_d = final_result_array_temp.dice_for_final_sum) === null || _d === void 0 ? void 0 : _d.push(random_num);
                                }
                                else {
                                    limit_exceded = true;
                                }
                            }
                            else {
                                bad_dice_format = true;
                            }
                        }
                    }
                    this.final_result_array = final_result_array_temp;
                });
            }
            else {
                limit_exceded = true;
            }
        }
        else {
            this.final_result_array = { error: true, msg: 'Formato de dado invalido' };
        }
        if (limit_exceded) {
            this.final_result_array = { error: true, msg: 'Haz excedido el maximo de dados no seas mamon' };
        }
        else if (bad_dice_format) {
            this.final_result_array = { error: true, msg: 'La estructura de tu comando es incorrecta' };
        }
    }
    give_answer_string() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var total_str = "Resultado final: ";
        var total_num = 0;
        var sub_str = "";
        if ((_a = this.final_result_array) === null || _a === void 0 ? void 0 : _a.hasOwnProperty('error')) {
            return (_b = this.final_result_array) === null || _b === void 0 ? void 0 : _b.msg;
        }
        else if (((_c = this.final_result_array) === null || _c === void 0 ? void 0 : _c.hasOwnProperty('dice_ordered_by_type')) && ((_d = this.final_result_array) === null || _d === void 0 ? void 0 : _d.hasOwnProperty('dice_for_final_sum'))) {
            if (Array.isArray((_e = this.final_result_array) === null || _e === void 0 ? void 0 : _e.dice_ordered_by_type) && Array.isArray((_f = this.final_result_array) === null || _f === void 0 ? void 0 : _f.dice_for_final_sum)) {
                (_g = this.final_result_array) === null || _g === void 0 ? void 0 : _g.dice_for_final_sum.forEach(e => {
                    total_num += e;
                });
                total_str += total_num;
                if (this.optional_sum_param != 0) {
                    total_str += ` + ${this.optional_sum_param} = ${total_num + this.optional_sum_param}`;
                }
                let dice_ordered_by_type = (_h = this.final_result_array) === null || _h === void 0 ? void 0 : _h.dice_ordered_by_type.sort();
                dice_ordered_by_type.forEach(dice_obj => {
                    Object.keys(dice_obj).forEach(key => {
                        sub_str += ` ${key} : (${dice_obj[key]})`;
                    });
                });
            }
        }
        return `${total_str}\nTotal por dados: ${sub_str}
        `;
    }
}
exports.default = DiceRoller;
