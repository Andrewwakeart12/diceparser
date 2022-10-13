interface dice_roller_array  {
    dice : string[]
}


interface final_roller_array  {
    dice_ordered_by_type?: {[key: string]: number}[] ,
    dice_for_final_sum?: number[],
    error? : boolean,
    msg? : string
}

export {dice_roller_array,final_roller_array};