import useStore from "popup/hooks/useStore";
import React, { cloneElement, useCallback, useMemo } from "react";
import { SettingStore } from "store";
import { SettingStorage } from "store/setting/interface";

interface Props {
  field: keyof SettingStorage;
  children: React.ReactElement<{
    value: object;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  }>;
}

const Field: React.FC<Props> = props => {
  const { field, children } = props;
  const settingStore = useStore(SettingStore);

  const fieldValue = useMemo(() => {
    const value = settingStore.data[field];
    if (typeof value === "boolean") {
      return {
        checked: value
      };
    }
    return {
      value
    };
  }, [settingStore.data[field]]);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      const changeData =
        typeof settingStore.data[field] === "boolean"
          ? event.target.checked
          : event.target.value;

      settingStore.data = {
        ...settingStore.data,
        [field]: changeData
      };
    },
    [field, settingStore]
  );

  return cloneElement(children, {
    ...fieldValue,
    onChange: handleChange
  });
};

export default Field;
