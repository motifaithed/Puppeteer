const puppeteer = require("puppeteer");
const getAllProducts = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const lastPage =
    "https://www.amazon.com/s?k=home&i=garden&rh=n%3A1055398%2Cp_36%3A-3000&dc&page=400&_encoding=UTF8&content-id=amzn1.sym.f82a0c18-ae2a-47cf-82ad-c85f0a157136&crid=12198XD9ZHIG6&pd_rd_r=e2cdb3f1-4a08-420e-9817-98f75f507104&pd_rd_w=vBYGj&pd_rd_wg=7dhzB&pf_rd_p=f82a0c18-ae2a-47cf-82ad-c85f0a157136&pf_rd_r=64QQKH248QY74229Y2JP&qid=1695965190&rnid=386465011&sprefix=hom%2Caps%2C248&ref=sr_pg_399";
  const page = await browser.newPage();
  await page.goto(lastPage, { waitUntil: "load" });
  const is_disabled =
    (await page.$(
      "span.s-pagination-item.s-pagination-next.s-pagination-disabled"
    )) !== null;
  console.log(is_disabled);
  await browser.close();
};

getAllProducts();
