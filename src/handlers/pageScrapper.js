const scraperObject = (url) => ({
  url,
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    // Wait for the required DOM to be rendered
    await page.waitForSelector("body");
    // Get  all the link
    let urls = await page.$$eval("body a", (links) => {
      // Get href attibute
      links = links.map((link) => link.href);
      return links;
    });

    // filter urls to get only inner
    urls = urls.filter((link) => link.includes(this.url));
    console.log(urls);
  },
});

module.exports = scraperObject;
