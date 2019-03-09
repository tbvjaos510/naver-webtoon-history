import ListDaily from './ListDaily';
import ListHistory from './ListHistory';
import Option from './Option';
import { SwitcherProps } from '../components/switcher';

export const Tabs: SwitcherProps = {
  webtoonComponents: [
    { title: '최근 본 웹툰', component: ListHistory },
    { title: '웹툰 목록', component: ListDaily },
    { title: '설정', component: Option },
  ],
};
