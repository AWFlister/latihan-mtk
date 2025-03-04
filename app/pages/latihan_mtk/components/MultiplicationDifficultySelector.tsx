import { Form } from "react-bootstrap";

type Props = {
  difficulty: number,
  setDifficulty: Function,
}

const labels = [
  '',
  "1 digit x 1 digit (< 5)",
  "1 digit x 1 digit",
  "2 digit x 1 digit (< 5)",
  "2 digit x 1 digit",
  "2 digit x 2 digit",
]

export function MultiplicationDifficultySelector({ difficulty, setDifficulty }: Props) {
  return (
    <div>
      <Form>
        {
          labels.map((label, idx) => {
            if (idx) return (
              <Form.Check
                id={`multiplication-${idx}-radio`}
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
