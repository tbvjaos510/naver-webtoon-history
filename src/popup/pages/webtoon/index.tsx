import { Container, makeStyles, Tab, Tabs } from "@material-ui/core";
import useStore from "popup/hooks/useStore";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { SettingStore } from "store";
import { Day } from "store/webtoon/interface";

const DayText = ["일", "월", "화", "수", "목", "금", "토"];

const useStyle = makeStyles({
  tab: {
    minWidth: 0
  }
});

const WebtoonList: React.FC = () => {
  const { data: setting } = useStore(SettingStore);
  const classes = useStyle();
  const today = useMemo(() => new Date().getDay(), []);
  const [currentDay, setCurrentDay] = useState(today);

  const handleChangeDay = useCallback((_, value: Day) => {
    setCurrentDay(value);
  }, []);

  useEffect(() => {
    if (setting.showFavorate) {
      setCurrentDay(-1);
    }
  }, [setting]);
  return (
    <Container>
      <Tabs
        value={currentDay}
        variant="fullWidth"
        indicatorColor="primary"
        onChange={handleChangeDay}
      >
        {setting.showFavorate && (
          <Tab key="즐겨찾기" className={classes.tab} label="★" value={-1} />
        )}
        {DayText.map((day, index) => (
          <Tab key={day} className={classes.tab} label={day} value={index} />
        ))}
      </Tabs>
    </Container>
  );
};

export default memo(WebtoonList);
