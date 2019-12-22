import { Container } from "@material-ui/core";
import SettingSection from "popup/components/setting/SettingSection";
import React from "react";

const Setting: React.FC = () => {
  return (
    <Container>
      <SettingSection title="최근 본 웹툰" />
    </Container>
  );
};

export default Setting;
