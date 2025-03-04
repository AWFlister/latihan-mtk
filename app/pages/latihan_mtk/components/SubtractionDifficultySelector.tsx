import { Form } from "react-bootstrap";

type Props = {
  difficulty: number,
  setDifficulty: Function,
  allowNegative: boolean,
  setAllowNegative: Function
}

const labels = [
  '',
  "Level 1 (1 digit)",
  "Level 2 (1 digit dan 2 digit)",
  "Level 3 (2 digit)",
  "Level 4 (2 digit dan 3 digit)",
  "Level 5 (3 digit)",
]

export function SubtractionDifficultySelector({ difficulty, setDifficulty, allowNegative, setAllowNegative }: Props) {
  return (
    <div>
      <Form>
        {
          labels.map((label, idx) => {
            if (idx) return (
              <Form.Check
                id={`subtraction-${idx}-radio`}
                key={label}
                type="radio"
                label={label}
                name="difficulty"
                value={idx}
                checked={difficulty == idx}
                onChange={(e) => setDifficulty(e)}
              />)
          })
        }

        {/* Allow Negative Answer Checkbox */}
        <Form.Check
          id="allow-negative-check"
          className="mt-2"
          type="checkbox"
          label="Izinkan jawaban negatif"
          checked={allowNegative}
          onChange={() => setAllowNegative(!allowNegative)}
        />
      </Form>
    </div>
  );
}
