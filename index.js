const puppeteer = require("puppeteer");

const getProductsDetail = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const amazonClothesUrl =
    "https://www.amazon.com/s?k=home&i=garden&rh=n%3A1055398%2Cp_36%3A-3000&dc&_encoding=UTF8&content-id=amzn1.sym.f82a0c18-ae2a-47cf-82ad-c85f0a157136&crid=12198XD9ZHIG6&pd_rd_r=e2cdb3f1-4a08-420e-9817-98f75f507104&pd_rd_w=vBYGj&pd_rd_wg=7dhzB&pf_rd_p=f82a0c18-ae2a-47cf-82ad-c85f0a157136&pf_rd_r=64QQKH248QY74229Y2JP&qid=1663266142&rnid=386465011&sprefix=hom%2Caps%2C248&ref=pd_gw_unk";
  const productHandlesSelector =
    "#search > div.s-desktop-width-max.s-desktop-content.s-wide-grid-style-t1.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row";
  const productHandleSelectorClass = "div > .sg-col-inner";
  const page = await browser.newPage();
  await page.goto(amazonClothesUrl);
  const productHandles = await page.$$(
    `${productHandlesSelector} > ${productHandleSelectorClass}`
  );
  let title = "null";
  let price = "null";
  let img = "null";
  const items = [];
  for (const productHandle of productHandles) {
    try {
      title = await page.evaluate(
        (el) => el.querySelector("h2 > a > span").textContent,
        productHandle
      );
      price = await page.evaluate(
        (el) => el.querySelector(".a-price > .a-offscreen").textContent,
        productHandle
      );
      img = await page.evaluate(
        (el) => el.querySelector(".s-image").getAttribute("src"),
        productHandle
      );
      items.push({ title, price, img });
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  console.log("ITEMS: ", items);
  await browser.close();
};

getProductsDetail();
