const pageScraper = require("./pageScrapper");
// "https://madappgang.com"

async function scrapeAll(browserInstance, urlForSearch, depth) {
  let browser;
  try {
    browser = await browserInstance;
    await pageScraper(urlForSearch, depth).scraper(browser);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance, urlForSearch, depth) =>
  scrapeAll(browserInstance, urlForSearch, depth);
