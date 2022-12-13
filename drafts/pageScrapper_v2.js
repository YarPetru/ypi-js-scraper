const pageScraper = (urlsArray) => ({
  urlsArray,
  async scraper(browser) {
    // for (i = 1; i <= 2; i += 1) {
    let searchedUrls = this.urlsArray;
    console.log(searchedUrls);
    // + функция, которая возвращает нужные данные со страницы
    let pagePromise = (link) =>
      new Promise(async (resolve, reject) => {
        let dataObj = {};
        let page = await browser.newPage();
        await page.goto(link);

        // Get all content
        let content = await page.content();

        // Get urls and mails
        dataObj["urls"] = await page.$$eval("body a", (links) => {
          links = links.map((l) => l.href);
          links = links.filter((l) => l.startsWith("https"));
          return links;
        });
        dataObj["mails"] = content.match(
          /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
        );
        resolve(dataObj);
        await page.close();
      });
    // Проходимся по всему списку сайтов в массиве УРЛ
    for (link in searchedUrls) {
      // Может цикл for (i = 1; i <= 2; i += 1) поставить внутрь этого цикла

      console.log(`Iteration ${i}.\n Data from: ${searchedUrls[link]} `);
      // вызываем функцию
      let currentPageData = await pagePromise(searchedUrls[link]);
      console.log(currentPageData);

      // console.log(`Iteration ${i} - nesting depth ${i}`);

      // for (let sublink of Object.values(currentPageData)) {
      //   console.log(sublink);
      // }
    }
    // }
    // //  1st itaration - сайт записан строкой
    // console.log("1st iteration - Main page data");
    // let url = this.url;
    // let page = await browser.newPage();
    // console.log(`Navigating to ${url}...`);
    // console.log(`........................`);

    // await page.goto(url);
    // // Wait for the required DOM to be rendered
    // await page.waitForSelector("body");

    // // Get  all the links on Main page
    // let searchedUrls = await page.$$eval("body a", (links) => {
    //   // ------------------- МОЖНО ЛИ ДОСТАТАТЬ ТУТ УРЛ?
    //   // Get href attibute
    //   links = links.map((l) => l.href);

    //   links = links.filter((l) => l.includes("https"));
    //   return links;
    // });

    // // ------------------------------

    // // Parse links and mails
    // let pagePromise = (link) =>
    //   new Promise(async (resolve, reject) => {
    //     let dataObj = {};
    //     let newPage = await browser.newPage();
    //     await newPage.goto(link);

    //     // Get all content
    //     let content = await page.content();

    //     // Get urls and mails
    //     dataObj["urls"] = await newPage.$$eval("body a", (links) => {
    //       links = links.map((l) => l.href);
    //       links = links.filter((l) => l.startsWith("https"));
    //       return links;
    //     });
    //     dataObj["mails"] = content.match(
    //       /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    //     );
    //     resolve(dataObj);
    //     await newPage.close();
    //   });

    // // filter urls to get only inner
    // searchedUrls = searchedUrls.filter((l) => l.startsWith(url));
    // console.log(searchedUrls);

    // console.log(`Iteration 2 - nesting depth 2`);
    // for (link in searchedUrls) {
    //   console.log("Data from: ", searchedUrls[link]);
    //   let currentPageData = await pagePromise(searchedUrls[link]);
    //   console.log(currentPageData);

    //   // console.log(`Iteration ${i} - nesting depth ${i}`);

    //   // for (let sublink of Object.values(currentPageData)) {
    //   //   console.log(sublink);
    //   // }
    // }
  },
});

module.exports = pageScraper;
