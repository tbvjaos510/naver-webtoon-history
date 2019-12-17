import { AppBar, Box, Link, Toolbar, Typography } from "@material-ui/core";
import React, { memo, useMemo } from "react";

import UrlLink from "../Link";

const Header: React.FC = () => {
  const version = useMemo(
    () =>
      chrome.runtime.getManifest().version +
      (ENV === "development" ? "-dev" : ""),
    []
  );
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar variant="dense">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          flex={1}
        >
          <Typography variant="h6">
            <UrlLink url="https://comic.naver.com/webtoon/weekday.nhn">
              <Link href="#" color="textPrimary">
                네이버 웹툰 확장앱
              </Link>
            </UrlLink>
          </Typography>
          <Typography variant="subtitle2">
            <Box ml={1}>{version}</Box>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
