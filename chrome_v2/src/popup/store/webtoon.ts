import { observable, computed } from 'mobx';
import RootStore from '.';

export type WebtoonType = {
  [key: number]: {
    title: string;
    type: 'webtoon' | 'bestChallenge' | 'challenge' | string;
  };
};

export type VisitType = {
  [key: number]: {
    [key: number]: number;
  }[];
};

export type ScrollType = {
  [key: number]: {
    [key: number]: number;
  };
};

export default class WebtoonStore {
  private saveToStore: (key: string, value: JSON) => void;

  constructor(saveToStore) {
    this.saveToStore = saveToStore;
  }

  /**
   * 방문한 웹툰의 제목과 타입을 저장합니다.
   */
  @observable webtoonType: WebtoonType = {};

  /**
   * 방문한 회차의 정보를 저장합니다.
   */
  @observable visits: VisitType = {};

  /**
   * 사용자가 본 스크롤 데이터를 저장합니다.
   */
  @observable scrolls: ScrollType = {};

  /**
   * 웹툰 기록의 개수
   *
   * @readonly
   */
  @computed get visitCount() {
    let result = 0;
    Object.keys(this.visits).forEach((v) => {
      result += Object.keys(this.visits[v]).length;
    });
    return result;
  }
}
