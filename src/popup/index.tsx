import "./style/uikit.scss";
import "uikit";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React);
}

ReactDOM.render(<App />, document.getElementById("root"));
