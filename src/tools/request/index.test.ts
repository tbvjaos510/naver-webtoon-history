import { mocked } from "ts-jest/utils";
import axios from "axios";
import request, { ogInfo, weekDay } from ".";
import AllWebtoonHtml from "./allWebtoon.html";
import CompleteWebtoonHtml from "./completeWebtoon.html";
jest.mock("axios");

describe("tools/request", () => {
  describe("getOpenGraph() work when", () => {
    it("openGraph is vaild", async () => {
      mocked(axios.get).mockResolvedValue({
        data: `<meta property="og:image" content="https://shared-comic.pstatic.net/thumb/TestThumb">
        <meta property="og:description" content="TestWebtoonTitle">`
      } as any);

      const ogData = await request.getOpenGraph("webtoon", 1, 1);

      expect(ogData).toEqual({
        img: "https://shared-comic.pstatic.net/thumb/TestThumb",
        title: "TestWebtoonTitle"
      } as ogInfo);
    });

    it("openGraph is invaild", async () => {
      mocked(axios.get).mockResolvedValue({
        data: `<meta property="og:image" content="https://shared-comic.pstatic.net/InVaildThumb">
        <meta property="og:description" content="TestWebtoonTitle">`
      } as any);

      const ogData = await request.getOpenGraph("webtoon", 1, 1);

      expect(ogData).toBe(null);
    });

    it("og:description not receive", async () => {
      mocked(axios.get).mockResolvedValue({
        data: `<meta property="og:image" content="https://shared-comic.pstatic.net/InVaildThumb">`
      } as any);

      const ogData = await request.getOpenGraph("webtoon", 1, 1);

      expect(ogData).toBe(null);
    });

    it("axios get error", async () => {
      mocked(axios.get).mockResolvedValue({ data: null } as any);

      const ogData = await request.getOpenGraph("webtoon", 1, 1);

      expect(ogData).toBe(null);
    });
  });

  describe("getAllWebtoon() work when", () => {
    it("axios get error", async () => {
      mocked(axios.get).mockResolvedValue({ data: null } as any);

      const ogData = await request.getAllWebtoon("StarScore");

      expect(ogData).toBe(null);
    });

    it("axios get success", async () => {
      mocked(axios.get).mockResolvedValue({ data: AllWebtoonHtml } as any);

      const webtoons = await request.getAllWebtoon("StarScore");

      expect(webtoons["mon"].length).toBe(37);
    });
  });

  describe("getComopleteWebtoon() work when", () => {
    it("axios get error", async () => {
      mocked(axios.get).mockResolvedValue({ data: null } as any);

      const webtoons = await request.getCompleteWebtoon();

      expect(webtoons).toBe(null);
    });

    it("axios get success", async () => {
      mocked(axios.get).mockResolvedValue({ data: CompleteWebtoonHtml } as any);

      const webtoons = await request.getCompleteWebtoon();

      expect(webtoons.length).toBe(603);
    });
  });
});
