import React, { memo, useMemo } from "react";

interface Props {
  id: keyof typeof i18n;
  children: string;
}

const Message: React.FC<Props> = props => {
  const { id, children } = props;

  const text = useMemo(() => {
    const message = chrome.i18n.getMessage(id);
    if (
      ENV === "development" || // 개발모드에선 i18n 적용여부를 바로 파악하기 위해 사용
      (message !== undefined && message.length > 0)
    ) {
      return message;
    }
    return children;
  }, [id]);

  return <>{text}</>;
};

export default memo(Message);
