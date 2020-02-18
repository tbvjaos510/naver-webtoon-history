import { useDailyWebtoonContext } from "popup/context/DailyWebtoon.context";
import useStore from "popup/hooks/useStore";
import React, { useEffect, useMemo, useState } from "react";
import { OrderStore, SettingStore } from "store";
import { Day } from "store/webtoon/interface";

interface Props {
  day: Day | "favo";
}

const DailyWebtoonList: React.FC<Props> = props => {
  const { day } = props;
  const settingStore = useStore(SettingStore);
  const orderStore = useStore(OrderStore);
  const { dailyWebtoon } = useDailyWebtoonContext();

  const webtoonList = useMemo(() => {
    if (day === "favo") {
      return [];
    }
    const webtoonSorts = orderStore.data[day];
    return dailyWebtoon[day]
      .slice()
      .sort((a, b) =>
        webtoonSorts.indexOf(a.id) > webtoonSorts.indexOf(b.id) ? 1 : -1
      );
  }, []);
  return <></>;
};

export default DailyWebtoonList;
