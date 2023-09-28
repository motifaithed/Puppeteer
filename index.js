const puppeteer = require("puppeteer");

const printWebpage = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.google.com");
  await page.screenshot({ path: "images/google.png" });
  await browser.close();
};

printWebpage();
