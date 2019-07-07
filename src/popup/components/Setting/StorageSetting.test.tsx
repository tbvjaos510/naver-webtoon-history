import * as React from "react";
import OptionStore from "../../../store/option";
import { shallow, ShallowWrapper } from "enzyme";
import StorageSetting from "./StorageSetting";
import { mocked } from "ts-jest/utils";

const optionStore = {
  localUsage: 100,
  syncUsage: 150,
  resetStore: jest.fn() as Function
} as OptionStore;

describe("<StorageSetting />", () => {
  it("render test", () => {
    const component = shallow(<StorageSetting option={optionStore} />).dive().dive();
    expect(component.find("a.uk-accordion-title").text()).toBe("저장 공간");
  });

  describe("button test", () => {
    let component: ShallowWrapper = null;
    beforeAll(() => {
      component = shallow(<StorageSetting option={optionStore} />).dive().dive();
    });

    it("reset local data button clicked", () => {
      component.find("SettingButton[tooltip^='로컬 데이터']").simulate("click");
      expect(optionStore.resetStore).toBeCalledWith("local");
      mocked(optionStore.resetStore).mockClear();
    });

    it("reset sync data button clicked", () => {
      component.find("SettingButton[tooltip^='계정 데이터']").simulate("click");
      expect(optionStore.resetStore).toBeCalledWith("sync");
      mocked(optionStore.resetStore).mockClear();
    });

    it("reset all button click", () => {
      window.location.reload = jest.fn();
      component.find("SettingButton[tooltip^='모든 데이터']").simulate("click");
      expect(optionStore.resetStore).toBeCalledTimes(2);
      expect(window.location.reload).toBeCalled();
      mocked(optionStore.resetStore).mockClear();
    });
  });
});
