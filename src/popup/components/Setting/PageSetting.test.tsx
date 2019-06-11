import * as React from "react";
import * as sinonChrome from "sinon-chrome";
import { shallow } from "enzyme";
import WebtoonStore from "../../../store/webtoon";
import OptionStore from "../../../store/option";
import PageSetting from "./PageSetting";
import SettingCheckBox from "./Inputs/SettingCheckBox";
import { mocked } from "ts-jest/utils";
import { addLinkContext, removeContext } from "../../../tools/contextMenu";
import SettingButton from "./Inputs/SettingButton";

jest.mock("../../../tools/contextMenu");

describe("<PageSetting />", () => {
  let webtoonStore = {
    scrolls: null
  } as WebtoonStore;
  let optionStore = {
    saveScroll: true,
    useContextMenu: false
  } as OptionStore;

  beforeAll(() => {
    global.chrome = sinonChrome;
  });
  afterAll(() => {
    sinonChrome.flush();
    delete global.chrome;
  });

  it("render test if saveScroll is true", () => {
    const component = shallow(<PageSetting webtoon={webtoonStore} option={optionStore} />).dive();
    expect(component.find(SettingCheckBox).length).toBe(4);
  });

  it("render test if saveScroll is false", () => {
    optionStore.saveScroll = false;
    const component = shallow(<PageSetting webtoon={webtoonStore} option={optionStore} />).dive();
    expect(component.find(SettingCheckBox).length).toBe(3);
  });

  describe("getContextMenuGrant() test", () => {
    let component = shallow(<PageSetting webtoon={webtoonStore} option={optionStore} />)
      .dive()
      .find("*[storeKey='useContextMenu']");

    describe("useContextMenu checked and", () => {
      beforeEach(() => {
        optionStore.useContextMenu = false;
        component.simulate("change", { target: { checked: true } });
      });
      afterEach(() => {
        mocked(addLinkContext).mockClear();
      });
      it("permission is contain", () => {
        sinonChrome.permissions.contains.yield(true);
        expect(addLinkContext).toBeCalled();
        expect(optionStore.useContextMenu).toBe(true);
      });

      describe("permission is not contain and", () => {
        it("permission request granted", () => {
          sinonChrome.permissions.contains.yield(false);
          sinonChrome.permissions.request.yield(true);
          expect(addLinkContext).toBeCalled();
          expect(optionStore.useContextMenu).toBe(true);
        });
        it("permission request not granted", () => {
          sinonChrome.permissions.contains.yield(false);
          sinonChrome.permissions.request.yield(false);
          expect(addLinkContext).not.toBeCalled();
          expect(optionStore.useContextMenu).toBe(false);
        });
      });
    });

    it("useContextMenu unchecked", () => {
      optionStore.useContextMenu = true;
      component.simulate("change", { target: { checked: false } });
      expect(removeContext).toBeCalled();
      mocked(removeContext).mock.calls[0][0]();
      expect(optionStore.useContextMenu).toBe(false);
    });
  });

  it("scroll data delete", () => {
    webtoonStore.scrolls = {
      23: {
        32: 10
      }
    };
    expect(Object.keys(webtoonStore.scrolls).length).toBe(1);
    const component = shallow(<PageSetting webtoon={webtoonStore} option={optionStore} />).dive();
    component.find(SettingButton).simulate("click");
    expect(Object.keys(webtoonStore.scrolls).length).toBe(0);
  });
});
