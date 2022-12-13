const scraperObject = (urlForSearch, depth = 3) => ({
  urlForSearch,
  async scraper(browser) {
    let urlForSearch = "https://" + this.urlForSearch;
    // urlForSearch = "https://" + urlForSearch;
    let page = await browser.newPage();
    console.log(`Navigating to ${urlForSearch}...`);
    console.log(`........................`);

    await page.goto(urlForSearch);

    let i = 1;

    let scrapedMails = [];
    let scrapedLinks = [];

    async function scrapeCurrentPage() {
      // Wait for the required DOM to be rendered
      await page.waitForSelector("body");
      // Get all content
      let content = await page.content();

      // Get all the Mails on Main page
      let searchedMails = content.match(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
      );

      // Get  all the links on Main page
      let searchedUrls = await page.$$eval("body a", (links) => {
        // Get href attibute
        links = links.map((l) => l.href);
        return links;
      });

      uniqueFilteredUrls = searchedUrls.filter(
        (item, pos) =>
          searchedUrls.indexOf(item) == pos && item.includes(urlForSearch)
      );

      uniqueFilteredMails = searchedMails.filter(
        (item, pos) => searchedMails.indexOf(item) == pos
      );

      // Loop through each of those links, open a new page instance and get the relevant data from them

      let pagePromise = (link) =>
        new Promise(async (resolve, reject) => {
          let dataObj = {};
          let newPage = await browser.newPage();
          await newPage.goto(link);
          // Get all content
          let content = await page.content();

          let currentPageLinks = await newPage.$$eval("body a", (links) => {
            links = links.map((l) => l.href);
            return links;
          });

          let currentPageMails = content.match(
            /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
          );

          // // GET UNIQUE LINKS
          // let filteredCurrentPageLinks = currentPageLinks.filter(
          //   (item, pos) =>
          //     scrapedLinks.indexOf(item) == pos && item.includes(urlForSearch)
          // );

          // // GET UNIQUE MAILS
          // let filteredCurrentPageMails = currentPageMails.filter(
          //   (item, pos) => scrapedMails.indexOf(item) == pos
          // );

          dataObj["urls"] = currentPageLinks;
          dataObj["mails"] = currentPageMails;

          resolve(dataObj);
          await newPage.close();
        });

      while (i <= depth) {
        console.log("DEPTH", depth);
        console.log("CURRENT DEPTH LEVEL", i);

        if (i === 1) {
          for (item in uniqueFilteredUrls) {
            let currentPageData = await pagePromise(uniqueFilteredUrls[item]);
            console.log("Data from: ", uniqueFilteredUrls[item]);
            console.log(currentPageData);

            // console.log(currentPageData.mails);
            // console.log(currentPageData.urls);

            scrapedMails = [
              ...new Set([...scrapedMails, ...currentPageData.mails]),
            ];

            // COLLECT ALL THE LINKS OF CURRENT LEVEL

            scrapedLinks = [
              ...new Set([...scrapedLinks, ...currentPageData.urls]),
            ];

            scrapedLinks = scrapedLinks.filter((l) => l.includes(urlForSearch));

            console.log("ALL THE MAILS EXCLUDING REPEATS \n", scrapedMails);
            console.log(
              "ALL THE 2nd LEVEL LINKS EXCLUDING REPEATS \n",
              scrapedLinks
            );
          }

          i += 1;
        } else {
          for (item in scrapedLinks) {
            console.log(scrapedLinks[item]);
            await page.goto(scrapedLinks[item]);
            console.log("ITERATION", i);
            console.log("ныряем еще глубже");
            await page.close();
            return scrapeCurrentPage(); // Call this function recursively
          }

          i += 1;
          return scrapedLinks;

          // console.log("ITERATION", i);
          // console.log("ныряем еще глубже");
          // i += 1;
        }
      }
    }

    let data = await scrapeCurrentPage();
    console.log(data);
    return data;
  },
});

module.exports = scraperObject;
