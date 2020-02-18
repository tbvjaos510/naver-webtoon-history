import React from "react";

import { DailyWebtoonProvider } from "./DailyWebtoon.context";

const ContextProvider: React.FC = ({ children }) => {
  return <DailyWebtoonProvider>{children}</DailyWebtoonProvider>;
};

export default ContextProvider;
