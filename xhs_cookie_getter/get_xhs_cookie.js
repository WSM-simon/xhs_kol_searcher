// get_xhs_cookie_server.js
const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

let latestCookieHeader = "";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto("https://www.xiaohongshu.com/", {
    waitUntil: "networkidle2",
  });

  console.log("请在浏览器中手动登录小红书，登录后保持窗口不要关闭。");

  // 定时刷新并获取 cookie
  async function updateCookie() {
    await page.goto("https://www.xiaohongshu.com/", {
      waitUntil: "networkidle2",
    });
    const cookies = await page.cookies();
    latestCookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");
    console.log("已刷新 cookie:", latestCookieHeader);
  }

  // // 首次手动登录后，按回车开始定时任务
  // process.stdin.once("data", async () => {
  //   setInterval(updateCookie, 20 * 1000); // 每1分钟刷新一次
  // });

  // 提供 API
  app.get("/api/xhs-cookie", async (req, res) => {
    await updateCookie();
    res.json({ cookie: latestCookieHeader });
  });

  app.listen(3000, () => {
    console.log("API 服务已启动，端口 3000，接口 /api/xhs-cookie");
  });
})();
