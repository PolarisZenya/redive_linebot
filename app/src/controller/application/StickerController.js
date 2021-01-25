const { default: axios } = require("axios");
const cheerio = require("cheerio");
const { route, router } = require("bottender/router");

exports.stickerRoute = (context, props) => {
  return router([route()]);
};

/**
 * 根據貼圖包id取得內容資訊
 * @param {String} packgeId
 */
function getStickerInfo(packgeId) {
  let stampUrl = `https://store.line.me/stickershop/product/${packageId}/zh-Hant?from=sticker`;
  return axios
    .get(stampUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
      },
    })
    .then(res => res.data)
    .then(body => {
      const $ = cheerio.load(body);
      let title = $("p[data-test=sticker-name-title]").text();
      let stamps = [];
      let images = $("div.FnImage");
      if (images.length === 0) return;

      images.each(function () {
        let style = $(this).find("span").attr("style");
        let [href] = /https:\/\/stickershop.*?\.png/.exec(style);
        let { pathname } = new URL(href);
        stamps.push(pathname.split("/").find(path => /^\d+$/.test(path)));
      });

      stamps.sort().reverse();

      return { title, ..._getStickerRange(stamps) };
    })
    .catch(console.error);
}

/**
 * 取得貼圖範圍
 * @param {Array<String>} stamps
 */
function _getStickerRange(stamps) {
  let [max, min] = [stamps[0], stamps[stamps.length - 1]];

  let maxAry = max.split("");
  let minAry = min.split("");
  let diffMax = [];
  let diffMin = [];
  let same = [];

  maxAry.forEach((_, index) => {
    if (maxAry[index] !== minAry[index]) {
      diffMax.push(maxAry[index]);
      diffMin.push(minAry[index]);
    } else {
      same.push(_);
    }
  });

  return { max: diffMax.join(""), min: diffMin.join(""), prefix: same.join("") };
}
