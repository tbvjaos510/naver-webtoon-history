import { Checkbox, Container } from "@material-ui/core";
import SettingItem from "popup/components/setting/SettingItem";
import SettingSection from "popup/components/setting/SettingSection";
import Field from "popup/view/Field";
import React from "react";

const Setting: React.FC = () => {
  // const setting = useStore("setting");
  // const webtoon = useState("webtoon");
  console.log("rerender setting");
  return (
    <Container>
      <SettingSection title="최근 본 웹툰">
        <SettingItem name="최대 기록 개수">
          <Field field="showFavorate">
            <Checkbox />
          </Field>
        </SettingItem>
      </SettingSection>
    </Container>
  );
};

export default Setting;
