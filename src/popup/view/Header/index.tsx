import { mainGreen, mainWhite } from "popup/components/color";
import React, { memo, useMemo } from "react";
import styled from "styled-components";

import Link from "../Link";

const Header: React.FC = () => {
  const version = useMemo(
    () =>
      chrome.runtime.getManifest().version +
      (ENV === "development" ? "-dev" : ""),
    []
  );
  return (
    <Container>
      <Link url="https://comic.naver.com/webtoon/weekday.nhn">
        <Title>네이버 웹툰 확장앱</Title>
      </Link>
      <Version>{version}</Version>
    </Container>
  );
};

export default memo(Header);

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  height: 40px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  background-color: ${mainGreen};
  color: ${mainWhite};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  cursor: pointer;
`;

const Version = styled.span`
  font-size: 15px;
  margin-left: 4px;
  color: lightgray;
`;
