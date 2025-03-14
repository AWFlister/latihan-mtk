import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Stack, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DifficultySelector } from "./components/DifficultySelector";
import { OPERATIONS, type Operation, OPSYMBOLS, OPLABELS } from "./utils/constants";
import { generateNumbers } from "./utils/generateNumbers";
import { FaSync } from "react-icons/fa";

export function LatihanMTK() {
  const [operation, setOperation] = useState<Operation>(OPERATIONS.PLUS);
  const [difficulty, setDifficulty] = useState<number>(1);
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [allowNegative, setAllowNegative] = useState<boolean>(false);
  const [history, setHistory] = useState<{ question: string; userAnswer: string; correctAnswer: string }[]>([]);

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
      return;
    }

    const correctAnswer = calculateAnswer() as number;
    const isCorrect = parseFloat(answer) === correctAnswer;
    setMessage(isCorrect ? "Benar!" : `Salah. Jawaban yang benar adalah ${correctAnswer}`);

    setHistory((prev) => [
      { question: `${num1} ${OPSYMBOLS[operation]} ${num2}`, userAnswer: answer, correctAnswer: correctAnswer.toString() },
      ...prev.slice(0, 9), // Keep only last 10 items
    ]);

    setNums();
    setAnswer("");
  }

  function handleOperationChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newOperation: Operation = parseInt(e.target.value) as Operation;
    setOperation(newOperation);
    setNums();
    setHistory([]);
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
        <Col md={4}>
          <Form className="border border-primary p-3 rounded">
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

        <Col md={4}>
        </Col>

        <Col md={4}>
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
        <Stack className="mt-4" direction="horizontal" gap={2}>
          <Button className="flex-grow-1" onClick={handleSubmit}>
            Jawab
          </Button>
          <OverlayTrigger placement="top" overlay={<Tooltip>Ubah Soal</Tooltip>}>
            <Button variant="secondary" className="d-flex align-items-center" onClick={setNums}>
              &nbsp; <FaSync /> &nbsp;
            </Button>
          </OverlayTrigger>
        </Stack>
        <p className="mt-4">{message ? message : '\u00A0'}</p>
        <Stack className="mt-2 col-md-6 mx-auto">
          <h5>Riwayat Jawaban</h5>
          {history.length > 0 && (
            <ul className="list-unstyled">
              {history.map((entry, index) => (
                <li key={index} className="my-2">
                  {entry.question} = {entry.correctAnswer} ({entry.userAnswer === entry.correctAnswer ? "✅" : `❌ ${entry.userAnswer}`})
                </li> // ini question generator jadiin util func sendiri
              ))}
            </ul>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}