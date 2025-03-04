import { AdditionDifficultySelector } from "./AdditionDifficultySelector";
import { SubtractionDifficultySelector } from "./SubtractionDifficultySelector";
import { MultiplicationDifficultySelector } from "./MultiplicationDifficultySelector";
import { DivisionDifficultySelector } from "./DivisionDifficultySelector";
import { OPERATIONS, type Operation } from "../utils/constants";

type Props = {
    difficulty: number,
    setDifficulty: Function,
    operation: Operation,
    allowNegative: boolean,
    setAllowNegative: Function
}

export function DifficultySelector({ difficulty, setDifficulty, operation, allowNegative, setAllowNegative }: Props) {
    return (
        <div>
            <h5>Tingkat Kesulitan</h5>
            {operation === OPERATIONS.PLUS && (
                <AdditionDifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
            )}
            {operation === OPERATIONS.MINUS && (
                <SubtractionDifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} allowNegative={allowNegative} setAllowNegative={setAllowNegative} />
            )}
            {operation === OPERATIONS.MULTIPLICATION && (
                <MultiplicationDifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
            )}
            {operation === OPERATIONS.DIVISION && (
                <DivisionDifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
            )}
        </div>
    );
}
