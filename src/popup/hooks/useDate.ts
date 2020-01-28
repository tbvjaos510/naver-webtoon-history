import { useEffect, useState } from "react";

export default function useDate() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setTimeout(() => {
      setNow(new Date());
    }, (61 - now.getSeconds()) * 1000); // 시스템 오차 방지로 1초 추가함

    return () => {
      clearTimeout(timer);
    };
  }, [now]);

  return now;
}
