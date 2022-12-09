const pageScraper = require("./pageScrapper");
// "https://madappgang.com"

async function scrapeAll(browserInstance, siteForSearch) {
  let browser;
  try {
    browser = await browserInstance;
    await pageScraper(siteForSearch).scraper(browser);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance, siteForSearch) =>
  scrapeAll(browserInstance, siteForSearch);
