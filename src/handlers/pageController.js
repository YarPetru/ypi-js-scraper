const pageScraper = require("./pageScrapper");

async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    await pageScraper("https://madappgang.com").scraper(browser);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
