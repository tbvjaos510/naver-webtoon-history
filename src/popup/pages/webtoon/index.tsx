import { DAY_LIST, DAYS, WEBTOON_ROUTE } from "constraint";
import Tabs from "popup/components/Tabs";
import LinkTab from "popup/components/Tabs/Tab";
import useDate from "popup/hooks/useDate";
import useStore from "popup/hooks/useStore";
import React, { useMemo } from "react";
import { useRouteMatch } from "react-router";
import { SettingStore } from "store";
import { Day } from "store/webtoon/interface";
import styled from "styled-components";

import DailyWebtoonList from "./DailyWebtoonList";

interface RouteParams {
  day: Day | "favo";
}
const WebtoonList: React.FC = () => {
  const { data } = useStore(SettingStore);
  const today = useDate().getDay();
  const routeMatch = useRouteMatch<RouteParams>(`${WEBTOON_ROUTE}/:day`);

  const currentDay = useMemo(() => {
    if (routeMatch?.params?.day !== undefined) {
      return routeMatch?.params?.day;
    }
    if (data.showFavorate) {
      return "favo";
    }
    return routeMatch?.params?.day ?? DAYS[today];
  }, [routeMatch, data]);
  return (
    <Container>
      <Tabs>
        {data.saveFavorate && (
          <LinkTab
            value={`${WEBTOON_ROUTE}/favo`}
            active={currentDay === "favo"}
            label="★"
          />
        )}
        {DAYS.map((day, index) => (
          <LinkTab
            key={day}
            value={`${WEBTOON_ROUTE}/${day}`}
            label={chrome.i18n.getMessage(DAY_LIST[index])}
            active={currentDay === day}
          />
        ))}
      </Tabs>
      <DailyWebtoonList />
    </Container>
  );
};

export default WebtoonList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
