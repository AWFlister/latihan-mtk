import { Form } from "react-bootstrap";

export function DivisionDifficultySelector({ difficulty, setDifficulty }) {
  return (
    <div>
      <Form>
        <Form.Check
          type="radio"
          label="1 digit ÷ 1 digit"
          name="difficulty"
          value="1"
          checked={difficulty === "1"}
          onChange={(e) => setDifficulty(e.target.value)}
        />
        <Form.Check
          type="radio"
          label="2 digit ÷ 1 digit"
          name="difficulty"
          value="2"
          checked={difficulty === "2"}
          onChange={(e) => setDifficulty(e.target.value)}
        />
        <Form.Check
          type="radio"
          label="2 digit ÷ 2 digit"
          name="difficulty"
          value="3"
          checked={difficulty === "3"}
          onChange={(e) => setDifficulty(e.target.value)}
        />
      </Form>
    </div>
  );
}
