import useStore from "popup/hooks/useStore";
import React, { useCallback, useContext, useEffect, useState } from "react";
import FetchDailyWebtoon, {
  DailyWebtoonResult
} from "service/dailyWebtoon.service";
import { SettingStore, WebtoonStore } from "store";
import { Day, WebtoonStorage, WebtoonType } from "store/webtoon/interface";

interface ContextType {
  dailyWebtoon: DailyWebtoonResult;
  refetch: () => void;
}

export const DailyWebtoonContext = React.createContext<ContextType | null>(
  null
);

export const DailyWebtoonProvider: React.FC = ({ children }) => {
  const settingStore = useStore(SettingStore);
  const webtoonStore = useStore(WebtoonStore);

  const [dailyWebtoon, setDailyWebtoon] = useState<DailyWebtoonResult>({
    [Day.MON]: [],
    [Day.TUE]: [],
    [Day.WED]: [],
    [Day.THU]: [],
    [Day.FRI]: [],
    [Day.SAT]: [],
    [Day.SUN]: []
  });

  const fetchWebtoon = useCallback(() => {
    FetchDailyWebtoon({ order: settingStore.data.orderBy }).then(webtoon => {
      setDailyWebtoon(webtoon);
      webtoonStore.data = Object.assign(
        webtoonStore.data,
        Object.entries(webtoon)
          .flatMap(item => item[1])
          .reduce(
            (prev, curr) => ({
              ...prev,
              [curr.id]: { ...curr, type: WebtoonType.WEBTOON }
            }),
            {} as WebtoonStorage
          )
      );
    });
  }, [settingStore.data.orderBy]);

  useEffect(() => {
    fetchWebtoon();
  }, [settingStore.data.orderBy]);

  return (
    <DailyWebtoonContext.Provider
      value={{ dailyWebtoon, refetch: fetchWebtoon }}
    >
      {children}
    </DailyWebtoonContext.Provider>
  );
};

export function useDailyWebtoonContext() {
  const context = useContext(DailyWebtoonContext);
  if (!context) {
    throw new Error("WebtoonContext가 초기화 되지 않음");
  }

  return context;
}
