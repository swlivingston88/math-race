import { mathService } from "./MathService.js"

export function getLevel(level = 0) {
    switch(level) {
        case 0:
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : mathService.ops.plus
            }
        case 1:
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : mathService.ops.minus
            }
        case 2:
            let r2 = mathService.ops.plus;
            r2.max = 20;
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : r2
            }
        case 3:
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : mathService.ops.multiply
            }
        case 4:
            return {
                moveChance : 30,
                winningScore : 14,
                mathObject : mathService.ops.plus
            }
        case 5:
            let m = mathService.ops.multiply;
            m.max = 4;
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : m
            }
        case 6:
            return {
                moveChance : 30,
                winningScore : 14,
                mathObject : mathService.ops.minus
            }
        case 7:
            let m1 = mathService.ops.multiply;
            m1.max = 6;
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : m1
            }
        case 7:
            let r6 = mathService.ops.plus;
            r6.max = 40;
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : r6
            }
        case 8:
            let r7 = mathService.ops.multiply;
            r7.max = 7;
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : r7
            }
        case 9:
            let r8 = mathService.ops.minus;
            r8.max = 20;
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : r8
            }
        case 10:
            let m3 = mathService.ops.multiply;
            m3.max = 8;
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : m3
            }
        case 11:
            let r9 = mathService.ops.plus;
            r9.max = 80;
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : r9
            }
        case 12:
            let r10 = mathService.ops.multiply;
            r10.max = 9;
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : r10
            }
        case 13:
            let r11 = mathService.ops.minus;
            r11.max = 40;
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : r11
            }
        case 14:
            let r12 = mathService.ops.plus;
            r12.max = 100;
            return {
                moveChance : 20,
                winningScore : 14,
                mathObject : r12
            }
        case 15:
            let r13 = mathService.ops.multiply;
            r13.max = 10;
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : r13
            }
        case 16:
            let r14 = mathService.ops.minus;
            r14.max = 100;
            return {
                moveChance : 20,
                winningScore : 14,
                mathObject : r14
            }
        case 17:
            let r15 = mathService.ops.multiply;
            r15.max = 12;
            return {
                moveChance : 15,
                winningScore : 14,
                mathObject : r15
            }
    }
}
