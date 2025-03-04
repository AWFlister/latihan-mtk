import { Form } from "react-bootstrap";

type Props = {
  difficulty: number,
  setDifficulty: Function,
}

const labels = [
  '',
  "Level 1 (1 digit)",
  "Level 2 (1 digit dan 2 digit)",
  "Level 3 (2 digit)",
  "Level 4 (2 digit dan 3 digit)",
  "Level 5 (3 digit)",
]

export function AdditionDifficultySelector({ difficulty, setDifficulty }: Props) {
  return (
    <div>
      <Form>
        {
          labels.map((label, idx) => {
            if (idx) return (
              <Form.Check
                id={`addition-${idx}-radio`}
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
      </Form>
    </div>
  );
}
