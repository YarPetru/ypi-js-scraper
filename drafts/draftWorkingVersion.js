// VERSION 1
// const scraperObject = (url) => ({
//   url,
//   async scraper(browser) {
//     //  1st itaration - сайт записан строкой
//     console.log("1st iteration - Main page data");
//     //  next iteration - пробегается по массиву сайтов
//     let url = this.url;
//     let page = await browser.newPage();
//     console.log(`Navigating to ${url}...`);
//     console.log(`........................`);

//     await page.goto(url);
//     // Wait for the required DOM to be rendered
//     await page.waitForSelector("body");

//     // Get all content
//     let content = await page.content();
//     // Get  all the links on Main page
//     let searchedUrls = await page.$$eval("body a", (links) => {
//       // ------------------- МОЖНО ЛИ ДОСТАТАТЬ ТУТ УРЛ?
//       // Get href attibute
//       links = links.map((l) => l.href);

//       links = links.filter((l) => l.includes("https"));
//       return links;
//     });

//     // ------------------------------
//     // Loop through each of those links, open a new page instance and get the relevant data from them

//     // Parse links and mails
//     let pagePromise = (link) =>
//       new Promise(async (resolve, reject) => {
//         let dataObj = {};
//         let newPage = await browser.newPage();
//         await newPage.goto(link);
//         // Get all content
//         let content = await page.content();
//         dataObj["urls"] = await newPage.$$eval("body a", (links) => {
//           links = links.map((l) => l.href);
//           // links = links.filter((l) => l.startsWith(url));
//           return links;
//         });
//         dataObj["mails"] = content.match(
//           /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
//         );

//         // dataObj["mails"] = await newPage.$eval(
//         //   // ПОИСК ПО КОНТЕНТУ ЕМЕЙЛОВ
//         //   ".price_color",
//         //   (text) => text.textContent
//         // );
//         resolve(dataObj);
//         await newPage.close();
//       });

//     // // filter urls to get only inner
//     searchedUrls = searchedUrls.filter((l) => l.startsWith(url));
//     // console.log(searchedUrls);

//     for (link in searchedUrls) {
//       console.log("Data from: ", searchedUrls[link]);
//       let currentPageData = await pagePromise(searchedUrls[link]);
//       // scrapedData.push(currentPageData);
//       console.log(currentPageData);
//     }
//   },
// });
// VERSION 1

// VERSION 2
// const scraperObject = (url) => ({
//   url,
//   async scraper(browser) {
//     //  1st itaration - сайт записан строкой
//     console.log("1st iteration - Main page data");
//     let url = this.url;
//     let page = await browser.newPage();
//     console.log(`Navigating to ${url}...`);
//     console.log(`........................`);

//     await page.goto(url);
//     // Wait for the required DOM to be rendered
//     await page.waitForSelector("body");

//     // Get  all the links on Main page
//     let searchedUrls = await page.$$eval("body a", (links) => {
//       // ------------------- МОЖНО ЛИ ДОСТАТАТЬ ТУТ УРЛ?
//       // Get href attibute
//       links = links.map((l) => l.href);

//       links = links.filter((l) => l.includes("https"));
//       return links;
//     });

//     // ------------------------------

//     // Parse links and mails
//     let pagePromise = (link) =>
//       new Promise(async (resolve, reject) => {
//         let dataObj = {};
//         let newPage = await browser.newPage();
//         await newPage.goto(link);

//         // Get all content
//         let content = await page.content();

//         // Get urls and mails
//         dataObj["urls"] = await newPage.$$eval("body a", (links) => {
//           links = links.map((l) => l.href);
//           links = links.filter((l) => l.startsWith("http"));
//           return links;
//         });
//         dataObj["mails"] = content.match(
//           /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
//         );
//         resolve(dataObj);
//         await newPage.close();
//       });

//     // filter urls to get only inner
//     searchedUrls = searchedUrls.filter((l) => l.startsWith(url));
//     console.log(searchedUrls);

//     console.log(`Iteration 2 - nesting depth 2`);
//     for (link in searchedUrls) {
//       console.log("Data from: ", searchedUrls[link]);
//       let currentPageData = await pagePromise(searchedUrls[link]);
//       console.log(currentPageData);

//       // console.log(`Iteration ${i} - nesting depth ${i}`);

//       // for (let sublink of Object.values(currentPageData)) {
//       //   console.log(sublink);
//       // }
//     }
//   },
// });

// VERSION 2
module.exports = scraperObject;
