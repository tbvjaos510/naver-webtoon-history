import classNames from "classnames";
import { NAVER_WEBTOON_URL } from "constraint";
import React, { memo, useMemo } from "react";
import styled from "styled-components";

import Message from "../../components/Message";
import UrlLink from "../Link";

const Header: React.FC = () => {
  const version = useMemo(() => chrome.runtime.getManifest().version, []);
  return (
    <Container className={classNames("uk-background-primary", "uk-width-1-1")}>
      <TitleContainer>
        <UrlLink url={`${NAVER_WEBTOON_URL}/webtoon/weekday.nhn`}>
          <Title className="uk-link-text">
            <Message id="APP_NAME">네이버 웹툰 도우미</Message>
          </Title>
        </UrlLink>
        <Subtitle className="uk-link-text">{version}</Subtitle>
      </TitleContainer>
    </Container>
  );
};

export default memo(Header);

const Container = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Title = styled.a`
  color: white !important;
  font-weight: 800;
  font-size: 22px;
`;

const Subtitle = styled.a`
  color: lightgrey !important;
  margin-left: 8px;
  font-size: 16px;
  font-weight: 600;
`;
