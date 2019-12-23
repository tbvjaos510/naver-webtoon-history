import useStore from "popup/hooks/useStore";
import React, { cloneElement, useCallback, useMemo } from "react";
import { SettingStore } from "store";
import openLink from "store/setting/action/OpenLink";
import { LinkTarget } from "store/setting/interface";

interface Props {
  url: string;
  children: React.ReactElement<{ onClick: () => void }>;
  forceTab?: boolean;
}

const UrlLink: React.FC<Props> = props => {
  const { url, forceTab, children } = props;
  const { data: setting } = useStore(SettingStore);

  const handleLinkClick = useCallback(() => {
    if (setting !== null) {
      openLink(url, forceTab === true ? LinkTarget.TAB : setting.linkTarget);
    }
  }, [forceTab, setting, url]);

  const clonedLink = useMemo(
    () => cloneElement(children, { onClick: handleLinkClick }),
    [children, handleLinkClick]
  );

  return clonedLink;
};

export default UrlLink;
