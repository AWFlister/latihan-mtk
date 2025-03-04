import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect } from "react";
import { Navbar, Container, Nav, Form, Row, Col, Stack, Button } from "react-bootstrap";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Home() {
  return /* @__PURE__ */ jsxs("div", { children: [
    "Test ",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("a", { href: "/latihan_mtk", className: "text-orange-600", children: "Latihan MTK" })
  ] });
}
function meta$1({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Other() {
  return /* @__PURE__ */ jsx(Home, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function TopNavbar() {
  return /* @__PURE__ */ jsx(Navbar, { bg: "primary", variant: "dark", expand: "lg", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Navbar.Brand, { href: "#", children: "Latihan MTK" }),
    /* @__PURE__ */ jsx(Navbar.Toggle, { "aria-controls": "basic-navbar-nav" }),
    /* @__PURE__ */ jsx(Navbar.Collapse, { id: "basic-navbar-nav", children: /* @__PURE__ */ jsxs(Nav, { className: "ms-auto", children: [
      /* @__PURE__ */ jsx(Nav.Link, { href: "#", children: "Home" }),
      /* @__PURE__ */ jsx(Nav.Link, { href: "#about", children: "About" })
    ] }) })
  ] }) });
}
const labels$2 = [
  "",
  "Level 1 (1 digit)",
  "Level 2 (1 digit dan 2 digit)",
  "Level 3 (2 digit)",
  "Level 4 (2 digit dan 3 digit)",
  "Level 5 (3 digit)"
];
function AdditionDifficultySelector({ difficulty, setDifficulty }) {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Form, { children: labels$2.map((label, idx) => {
    if (idx) return /* @__PURE__ */ jsx(
      Form.Check,
      {
        id: `addition-${idx}-radio`,
        type: "radio",
        label,
        name: "difficulty",
        value: idx,
        checked: difficulty == idx,
        onChange: (e) => setDifficulty(e)
      },
      label
    );
  }) }) });
}
const labels$1 = [
  "",
  "Level 1 (1 digit)",
  "Level 2 (1 digit dan 2 digit)",
  "Level 3 (2 digit)",
  "Level 4 (2 digit dan 3 digit)",
  "Level 5 (3 digit)"
];
function SubtractionDifficultySelector({ difficulty, setDifficulty, allowNegative, setAllowNegative }) {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Form, { children: [
    labels$1.map((label, idx) => {
      if (idx) return /* @__PURE__ */ jsx(
        Form.Check,
        {
          id: `subtraction-${idx}-radio`,
          type: "radio",
          label,
          name: "difficulty",
          value: idx,
          checked: difficulty == idx,
          onChange: (e) => setDifficulty(e)
        },
        label
      );
    }),
    /* @__PURE__ */ jsx(
      Form.Check,
      {
        id: "allow-negative-check",
        className: "mt-2",
        type: "checkbox",
        label: "Izinkan jawaban negatif",
        checked: allowNegative,
        onChange: () => setAllowNegative(!allowNegative)
      }
    )
  ] }) });
}
const labels = [
  "",
  "1 digit x 1 digit (< 5)",
  "1 digit x 1 digit",
  "2 digit x 1 digit (< 5)",
  "2 digit x 1 digit",
  "2 digit x 2 digit"
];
function MultiplicationDifficultySelector({ difficulty, setDifficulty }) {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Form, { children: labels.map((label, idx) => {
    if (idx) return /* @__PURE__ */ jsx(
      Form.Check,
      {
        id: `multiplication-${idx}-radio`,
        type: "radio",
        label,
        name: "difficulty",
        value: idx,
        checked: difficulty == idx,
        onChange: (e) => setDifficulty(e)
      },
      label
    );
  }) }) });
}
function DivisionDifficultySelector({ difficulty, setDifficulty }) {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Form, { children: [
    /* @__PURE__ */ jsx(
      Form.Check,
      {
        type: "radio",
        label: "1 digit ÷ 1 digit",
        name: "difficulty",
        value: "1",
        checked: difficulty === "1",
        onChange: (e) => setDifficulty(e.target.value)
      }
    ),
    /* @__PURE__ */ jsx(
      Form.Check,
      {
        type: "radio",
        label: "2 digit ÷ 1 digit",
        name: "difficulty",
        value: "2",
        checked: difficulty === "2",
        onChange: (e) => setDifficulty(e.target.value)
      }
    ),
    /* @__PURE__ */ jsx(
      Form.Check,
      {
        type: "radio",
        label: "2 digit ÷ 2 digit",
        name: "difficulty",
        value: "3",
        checked: difficulty === "3",
        onChange: (e) => setDifficulty(e.target.value)
      }
    )
  ] }) });
}
const OPERATIONS = {
  PLUS: 1,
  MINUS: 2,
  MULTIPLICATION: 3,
  DIVISION: 4
};
const OPSYMBOLS = {
  [OPERATIONS.PLUS]: "+",
  [OPERATIONS.MINUS]: "-",
  [OPERATIONS.MULTIPLICATION]: "x",
  [OPERATIONS.DIVISION]: "÷"
};
const OPLABELS = {
  [OPERATIONS.PLUS]: "Penjumlahan",
  [OPERATIONS.MINUS]: "Pengurangan",
  [OPERATIONS.MULTIPLICATION]: "Perkalian",
  [OPERATIONS.DIVISION]: "Pembagian (dalam pengembangan)"
};
function DifficultySelector({ difficulty, setDifficulty, operation, allowNegative, setAllowNegative }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h5", { children: "Tingkat Kesulitan" }),
    operation === OPERATIONS.PLUS && /* @__PURE__ */ jsx(AdditionDifficultySelector, { difficulty, setDifficulty }),
    operation === OPERATIONS.MINUS && /* @__PURE__ */ jsx(SubtractionDifficultySelector, { difficulty, setDifficulty, allowNegative, setAllowNegative }),
    operation === OPERATIONS.MULTIPLICATION && /* @__PURE__ */ jsx(MultiplicationDifficultySelector, { difficulty, setDifficulty }),
    operation === OPERATIONS.DIVISION && /* @__PURE__ */ jsx(DivisionDifficultySelector, { difficulty, setDifficulty })
  ] });
}
function generateNumbers(operation, difficulty, options) {
  if (operation == OPERATIONS.PLUS) {
    let firstNum, secondNum;
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
  } else if (operation == OPERATIONS.MINUS) {
    let firstNum, secondNum;
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
      let temp = firstNum;
      firstNum = secondNum;
      secondNum = temp;
    }
    return { firstNum, secondNum };
  } else if (operation == OPERATIONS.MULTIPLICATION) {
    let firstNum, secondNum;
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
  } else if (operation == OPERATIONS.DIVISION) {
    switch (difficulty) {
      case 1:
        return {
          firstNum: Math.round(1 + Math.random() * 8),
          secondNum: Math.round(1 + Math.random() * 8)
        };
      case 2:
        return {
          firstNum: Math.round(10 + Math.random() * 89),
          secondNum: Math.round(10 + Math.random() * 89)
        };
      case 3:
        return {
          firstNum: Math.round(100 + Math.random() * 899),
          secondNum: Math.round(100 + Math.random() * 899)
        };
      default:
        return {
          firstNum: 0,
          secondNum: 0
        };
    }
  } else
    return {
      firstNum: 0,
      secondNum: 0
    };
}
function LatihanMTK() {
  const [operation, setOperation] = useState(OPERATIONS.PLUS);
  const [difficulty, setDifficulty] = useState(1);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [allowNegative, setAllowNegative] = useState(false);
  useEffect(setNums, [operation, difficulty, allowNegative]);
  function setNums() {
    const { firstNum, secondNum } = generateNumbers(operation, difficulty, { allowNegative });
    setNum1(firstNum);
    setNum2(secondNum);
  }
  function calculateAnswer() {
    if (operation === OPERATIONS.DIVISION) {
      return {
        quotient: Math.floor(num1 / num2),
        numerator: num1 % num2,
        denominator: num2
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
    } else {
      const correctAnswer = calculateAnswer();
      const isCorrect = parseFloat(answer) === correctAnswer;
      setMessage(isCorrect ? "Benar!" : `Salah. Jawaban yang benar adalah ${correctAnswer}`);
    }
    setNums();
    setAnswer("");
  }
  function handleOperationChange(e) {
    const newOperation = parseInt(e.target.value);
    setOperation(newOperation);
    setNums();
    setMessage("");
  }
  function handleDifficultyChange(e) {
    const newDifficulty = parseInt(e.target.value);
    setDifficulty(newDifficulty);
    setNums();
    setMessage("");
  }
  return /* @__PURE__ */ jsxs(Container, { className: "mt-4 px-8", children: [
    /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsx(Col, { md: 3, children: /* @__PURE__ */ jsxs(Form, { children: [
        /* @__PURE__ */ jsx("h5", { children: "Operasi" }),
        Object.values(OPERATIONS).map((op) => /* @__PURE__ */ jsx(
          Form.Check,
          {
            id: `op-${op}-radio`,
            type: "radio",
            label: OPLABELS[op],
            name: "operation",
            value: op,
            checked: operation === op,
            onChange: handleOperationChange,
            disabled: op == OPERATIONS.DIVISION
          },
          op
        ))
      ] }) }),
      /* @__PURE__ */ jsx(Col, { md: 6 }),
      /* @__PURE__ */ jsx(Col, { md: 3, children: /* @__PURE__ */ jsx(
        DifficultySelector,
        {
          difficulty,
          setDifficulty: handleDifficultyChange,
          operation,
          allowNegative,
          setAllowNegative
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(Stack, { className: "mt-4 col-md-6 mx-auto text-center", children: [
      /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
        /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("h2", { children: num1 }) }),
        /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("h2", { children: OPSYMBOLS[operation] }) }),
        /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("h2", { children: num2 }) }),
        /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("h2", { children: "=" }) }),
        /* @__PURE__ */ jsx(Col, { children: operation === OPERATIONS.DIVISION ? /* @__PURE__ */ jsx(Fragment, { children: "Pass" }) : /* @__PURE__ */ jsx(
          Form.Control,
          {
            value: answer,
            onChange: (e) => setAnswer(e.target.value),
            placeholder: "?",
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Button, { className: "mt-4", onClick: handleSubmit, children: "Jawab" }),
      message && /* @__PURE__ */ jsx("p", { className: "mt-4", children: message })
    ] })
  ] });
}
function meta({}) {
  return [{
    title: "Latihan MTK"
  }, {
    name: "description",
    content: "Latihan MTK"
  }];
}
const latihan_mtk = withComponentProps(function LatihanMTKPage() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(TopNavbar, {}), /* @__PURE__ */ jsx(LatihanMTK, {})]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: latihan_mtk,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CLl5sKwW.js", "imports": ["/assets/chunk-IR6S3I6Y-DlraM7YA.js", "/assets/index-BV_UXJvs.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-CaCvv6X-.js", "imports": ["/assets/chunk-IR6S3I6Y-DlraM7YA.js", "/assets/index-BV_UXJvs.js", "/assets/with-props-BK1Xq7jJ.js"], "css": ["/assets/root-JBcxXloG.css"] }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-a7RXWUaJ.js", "imports": ["/assets/with-props-BK1Xq7jJ.js", "/assets/chunk-IR6S3I6Y-DlraM7YA.js"], "css": [] }, "routes/latihan_mtk": { "id": "routes/latihan_mtk", "parentId": "root", "path": "latihan_mtk", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/latihan_mtk-BZy9PV52.js", "imports": ["/assets/with-props-BK1Xq7jJ.js", "/assets/chunk-IR6S3I6Y-DlraM7YA.js", "/assets/index-BV_UXJvs.js"], "css": [] } }, "url": "/assets/manifest-86f68fa3.js", "version": "86f68fa3" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/latihan_mtk": {
    id: "routes/latihan_mtk",
    parentId: "root",
    path: "latihan_mtk",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  publicPath,
  routes
};
