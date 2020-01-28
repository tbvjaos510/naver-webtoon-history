import { WEBTOON_ROUTE } from "constraint";
import React from "react";
import { useRouteMatch } from "react-router";
import { Day } from "store/webtoon/interface";
import Logger from "utils/Logger";

interface RouteProps {
  day: Day;
}

const DailyWebtoonList: React.FC = () => {
  const matchedRoute = useRouteMatch<RouteProps>(`${WEBTOON_ROUTE}/:day`);

  if (matchedRoute !== null) {
    Logger.log("matchedRoute", matchedRoute);
  }
  return <></>;
};

export default DailyWebtoonList;
