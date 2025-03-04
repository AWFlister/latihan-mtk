import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import { DifficultySelector } from "./components/DifficultySelector";
import { OPERATIONS, type Operation, OPSYMBOLS, OPLABELS } from "./utils/constants";
import { generateNumbers } from "./utils/generateNumbers";

export function LatihanMTK() {
  const [operation, setOperation] = useState<Operation>(OPERATIONS.PLUS);
  const [difficulty, setDifficulty] = useState<number>(1);
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [allowNegative, setAllowNegative] = useState<boolean>(false);

  useEffect(setNums, [operation, difficulty, allowNegative]);

  function setNums() {
    const { firstNum, secondNum } = generateNumbers(operation, difficulty, { allowNegative })

    setNum1(firstNum)
    setNum2(secondNum)
  }

  function calculateAnswer() {
    if (operation === OPERATIONS.DIVISION) {
      return {
        quotient: Math.floor(num1 / num2),
        numerator: num1 % num2,
        denominator: num2,
      };
    } else {
      switch (operation) {
        case OPERATIONS.PLUS:
          return num1 + num2;
        case OPERATIONS.MINUS:
          return num1 - num2;
        case OPERATIONS.MULTIPLICATION:
          return num1 * num2;
        default:
          return 0;
      }
    }
  }

  function handleSubmit() {
    if (operation === OPERATIONS.DIVISION) {
      return
    } else {
      const correctAnswer = calculateAnswer() as number;
      const isCorrect = parseFloat(answer) === correctAnswer;
      setMessage(isCorrect ? "Benar!" : `Salah. Jawaban yang benar adalah ${correctAnswer}`);
    }

    setNums();
    setAnswer("");
  }

  function handleOperationChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newOperation: Operation = parseInt(e.target.value) as Operation;
    setOperation(newOperation);
    setNums();
    setMessage("");
  }

  function handleDifficultyChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newDifficulty = parseInt(e.target.value);
    setDifficulty(newDifficulty);
    setNums();
    setMessage("");
  }

  return (
    <Container className="mt-4 px-8">
      <Row>
        <Col md={3}>
          <Form>
            <h5>Operasi</h5>
            {Object.values(OPERATIONS).map((op) => (
              <Form.Check
                key={op}
                id={`op-${op}-radio`}
                type="radio"
                label={OPLABELS[op]}
                name="operation"
                value={op}
                checked={operation === op}
                onChange={handleOperationChange} // Change operation and re-randomize numbers
                disabled={op == OPERATIONS.DIVISION}
              />
            ))}
          </Form>
        </Col>

        <Col md={6}>
        </Col>

        <Col md={3}>
          <DifficultySelector
            difficulty={difficulty}
            setDifficulty={handleDifficultyChange}
            operation={operation}
            allowNegative={allowNegative}
            setAllowNegative={setAllowNegative}
          />
        </Col>
      </Row>
      <Stack className="mt-4 col-md-6 mx-auto text-center">
        <Row className="align-items-center">
          <Col>
            <h2>{num1}</h2>
          </Col>
          <Col>
            <h2>{OPSYMBOLS[operation]}</h2>
          </Col>
          <Col>
            <h2>{num2}</h2>
          </Col>
          <Col>
            <h2>=</h2>
          </Col>
          <Col>
            {operation === OPERATIONS.DIVISION ? (
              <>
                Pass
              </>
            ) : (
              <Form.Control
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="?"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            )}
          </Col>
        </Row>
        <Button className="mt-4" onClick={handleSubmit}>
          Jawab
        </Button>
        {message && <p className="mt-4">{message}</p>}
      </Stack>
    </Container>
  );
}