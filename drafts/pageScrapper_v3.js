const scraperObject = (urlForSearch) => ({
  urlForSearch,
  async scraper(browser) {
    let urlForSearch = this.urlForSearch;
    //  1st iteration - сайт записан строкой
    // if (urlForSearch.length === 1) {
    // if (typeof urlForSearch === "string") {
    // urlForSearch = "https://" + urlForSearch.toString();
    console.log(urlForSearch);
    let page = await browser.newPage();
    console.log(`Navigating to ${urlForSearch}...`);
    console.log(`........................`);
    await page.goto(urlForSearch);

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

    // GET only unique and inner links and mails
    uniqueFilteredUrls = searchedUrls.filter(
      (item, pos) =>
        searchedUrls.indexOf(item) == pos && item.includes(urlForSearch)
    );

    uniqueFilteredMails = searchedMails.filter(
      (item, pos) => searchedMails.indexOf(item) == pos
    );
    resolve(uniqueFilteredMails);
    // await page.close();

    for (let item in uniqueFilteredUrls) {
      console.log("Data from: ", uniqueFilteredUrls[item]);
      return scraperObject(uniqueFilteredUrls[item]);
    }
    // urlForSearch = uniqueFilteredUrls;

    // for (i = 1; i < depth; i += 1) {
    // if (i === 1) {
    // console.log(`iteration ${i}`);
    // console.log("Mails \n", uniqueFilteredMails);
    // console.log("next search on \n", urlForSearch);
    // return scraperObject(urlForSearch, i - 1);
    // } else {
    //   console.log(`Iteration ${i}`);
    //   scraperObject(urlForSearch, i - 1);
    //   return;
    // }
    // }

    // console.log("list for next scrap iteration", urlForSearch);
    // }

    // console.log("Mails \n", uniqueFilteredMails);
    // console.log("next search on \n", urlForSearch);
    // if (typeof urlForSearch === "array") {
    //   console.log("next search on \n", urlForSearch);
    // for (link in urlForSearch) {
    //   console.log("Data from: ", searchedUrls[link]);
    // }
    // }

    // ------------------------------

    // Parse links and mails
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
    //       links = links.filter((l) => l.startsWith("http"));
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

module.exports = scraperObject;

// const scraperObject = {
//   url: "http://books.toscrape.com",
//   async scraper(browser) {
//     let page = await browser.newPage();
//     console.log(`Navigating to ${this.url}...`);
//     // Navigate to the selected page
//     await page.goto(this.url);
//     let scrapedData = [];
//     // Wait for the required DOM to be rendered
//     async function scrapeCurrentPage() {
//       await page.waitForSelector(".page_inner");
//       // Get the link to all the required books
//       let urls = await page.$$eval("section ol > li", (links) => {
//         // Make sure the book to be scraped is in stock
//         links = links.filter(
//           (link) =>
//             link.querySelector(".instock.availability > i").textContent !==
//             "In stock"
//         );
//         // Extract the links from the data
//         links = links.map((el) => el.querySelector("h3 > a").href);
//         return links;
//       });
//       // Loop through each of those links, open a new page instance and get the relevant data from them
//       let pagePromise = (link) =>
//         new Promise(async (resolve, reject) => {
//           let dataObj = {};
//           let newPage = await browser.newPage();
//           await newPage.goto(link);
//           dataObj["bookTitle"] = await newPage.$eval(
//             ".product_main > h1",
//             (text) => text.textContent
//           );
//           dataObj["bookPrice"] = await newPage.$eval(
//             ".price_color",
//             (text) => text.textContent
//           );
//           dataObj["noAvailable"] = await newPage.$eval(
//             ".instock.availability",
//             (text) => {
//               // Strip new line and tab spaces
//               text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
//               // Get the number of stock available
//               let regexp = /^.*\((.*)\).*$/i;
//               let stockAvailable = regexp.exec(text)[1].split(" ")[0];
//               return stockAvailable;
//             }
//           );
//           dataObj["imageUrl"] = await newPage.$eval(
//             "#product_gallery img",
//             (img) => img.src
//           );
//           dataObj["bookDescription"] = await newPage.$eval(
//             "#product_description",
//             (div) => div.nextSibling.nextSibling.textContent
//           );
//           dataObj["upc"] = await newPage.$eval(
//             ".table.table-striped > tbody > tr > td",
//             (table) => table.textContent
//           );
//           resolve(dataObj);
//           await newPage.close();
//         });

//       for (link in urls) {
//         let currentPageData = await pagePromise(urls[link]);
//         scrapedData.push(currentPageData);
//         // console.log(currentPageData);
//       }
//       // When all the data on this page is done, click the next button and start the scraping of the next page
//       // You are going to check if this button exist first, so you know if there really is a next page.
//       let nextButtonExist = false;
//       try {
//         const nextButton = await page.$eval(".next > a", (a) => a.textContent);
//         nextButtonExist = true;
//       } catch (err) {
//         nextButtonExist = false;
//       }
//       if (nextButtonExist) {
//         await page.click(".next > a");
//         return scrapeCurrentPage(); // Call this function recursively
//       }
//       await page.close();
//       return scrapedData;
//     }

//     let data = await scrapeCurrentPage();
//     console.log(data);
//     return data;
//   },
// };

// module.exports = scraperObject;
