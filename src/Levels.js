import { mathService } from "./MathService.js"

function getMathObject(level = 0) {
    switch(level) {
        case 0:
            return mathService.ops.plus;
        case 1:
            let r = mathService.ops.plus;
            r.max = 15;
            return r;
    }
}

export const LEVELS = [
    {
        moveChance : 30,
        winningScore : 14,
        mathObject : getMathObject(0)
    },
    {
        moveChance : 30,
        winningScore : 14,
        mathObject : getMathObject(0)
    }
]

