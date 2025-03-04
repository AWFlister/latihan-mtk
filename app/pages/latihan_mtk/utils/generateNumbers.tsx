import { OPERATIONS, type Operation } from "./constants"

type GenerateNumbersOptions = {
    allowNegative?: boolean
}

export function generateNumbers(operation: Operation, difficulty: number, options: GenerateNumbersOptions): { firstNum: number, secondNum: number } {
    if (operation == OPERATIONS.PLUS) {
        let firstNum: number, secondNum: number;

        switch (difficulty) {
            case 1:
                firstNum = Math.floor(1 + Math.random() * 8);
                secondNum = Math.floor(1 + Math.random() * 8);
                break;
            case 2:
                firstNum = Math.floor(10 + Math.random() * 8);
                secondNum = Math.floor(10 + Math.random() * 89);
                break;
            case 3:
                firstNum = Math.floor(10 + Math.random() * 89);
                secondNum = Math.floor(10 + Math.random() * 89);
                break;
            case 4:
                firstNum = Math.floor(10 + Math.random() * 89);
                secondNum = Math.floor(10 + Math.random() * 899);
                break;
            case 5:
                firstNum = Math.floor(100 + Math.random() * 899);
                secondNum = Math.floor(100 + Math.random() * 899);
                break;
            default:
                firstNum = 0;
                secondNum = 0;
        }

        if (Math.random() < 0.5) {
            [firstNum, secondNum] = [secondNum, firstNum];
        }

        return { firstNum, secondNum };
    }
    else if (operation == OPERATIONS.MINUS) {
        let firstNum: number, secondNum: number

        switch (difficulty) {
            case 1:
                firstNum = Math.floor(1 + Math.random() * 8);
                secondNum = Math.floor(1 + Math.random() * 8);
                break;
            case 2:
                firstNum = Math.floor(10 + Math.random() * 8);
                secondNum = Math.floor(10 + Math.random() * 89);
                break;
            case 3:
                firstNum = Math.floor(10 + Math.random() * 89);
                secondNum = Math.floor(10 + Math.random() * 89);
                break;
            case 4:
                firstNum = Math.floor(10 + Math.random() * 89);
                secondNum = Math.floor(10 + Math.random() * 899);
                break;
            case 5:
                firstNum = Math.floor(100 + Math.random() * 899);
                secondNum = Math.floor(100 + Math.random() * 899);
                break;
            default:
                firstNum = 0;
                secondNum = 0;
        }

        if (Math.random() < 0.5) {
            [firstNum, secondNum] = [secondNum, firstNum];
        }

        if (!options.allowNegative && firstNum < secondNum) {
            let temp = firstNum
            firstNum = secondNum
            secondNum = temp
        }

        return { firstNum, secondNum }
    }
    else if (operation == OPERATIONS.MULTIPLICATION) {
        let firstNum: number, secondNum: number;

        switch (difficulty) {
            case 1:
                firstNum = Math.floor(1 + Math.random() * 8);
                secondNum = Math.floor(1 + Math.random() * 4);
                break;
            case 2:
                firstNum = Math.floor(1 + Math.random() * 8);
                secondNum = Math.floor(1 + Math.random() * 8);
                break;
            case 3:
                firstNum = Math.floor(10 + Math.random() * 89);
                secondNum = Math.floor(1 + Math.random() * 4);
                break;
            case 4:
                firstNum = Math.floor(10 + Math.random() * 89);
                secondNum = Math.floor(1 + Math.random() * 8);
                break;
            case 5:
                firstNum = Math.floor(10 + Math.random() * 89);
                secondNum = Math.floor(10 + Math.random() * 89);
                break;
            default:
                firstNum = 0;
                secondNum = 0;
        }

        if (Math.random() < 0.5) {
            [firstNum, secondNum] = [secondNum, firstNum];
        }

        return { firstNum, secondNum };

    }
    else if (operation == OPERATIONS.DIVISION) {
        switch (difficulty) {
            case 1:
                return {
                    firstNum: Math.round(1 + Math.random() * 8),
                    secondNum: Math.round(1 + Math.random() * 8),
                }
            case 2:
                return {
                    firstNum: Math.round(10 + Math.random() * 89),
                    secondNum: Math.round(10 + Math.random() * 89),
                }
            case 3:
                return {
                    firstNum: Math.round(100 + Math.random() * 899),
                    secondNum: Math.round(100 + Math.random() * 899),
                }
            default:
                return {
                    firstNum: 0,
                    secondNum: 0,
                }
        }
    }
    else
        return {
            firstNum: 0,
            secondNum: 0,
        }
}