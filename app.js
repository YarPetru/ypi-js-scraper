const readline = require("readline");
const program = require("commander");
require("colors");

const browserObject = require("./src/handlers/browser");
const scraperController = require("./src/handlers/pageController");

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller

// ----------------commander

// --- COMMANDS
program.command("go").description("Start app");

// --- OPTIONS - FLAGS
// program.option("-url, --url <type>", "url for scraping");
// .action((site) => console.log(`Start search on ${site}`));

program.parse(process.argv);

const argv = program.opts();

// export default argv;

// --------------------------

// ---------readline processing
const rl = readline.createInterface({
  input: process.stdin, // ввод
  output: process.stdout, // вывод
});

rl.question("Enter url for searching emails: \n".cyan.italic, (site) => {
  // if (argv.url) {
  // if (site === string)
  //  !!! ________  НА ПЕРВОЙ ИТЕРАЦИИ У НАС МАССИВ
  // А НА ПОСЛЕДУЮЩИХ МАССИВ ВНУТРИ ОБЪЕКТА

  // argv.url = new Array(site.trim());
  // if (argv.url.length > 0) {

  argv.url = site.trim();

  if (argv.url) {
    console.log(`Start searching on: ${site}`.bgYellow.blue.bold.italic);

    let urlForSearch = argv.url;
    // MAIN FUNCTION START
    scraperController(browserInstance, urlForSearch, 3);
    // scraperController(browserInstance, urlForSearch, numberOfIteration);

    // CLOSE THE APP
    rl.close();
  } else {
    rl.setPrompt("Enter the url please \n");
    rl.prompt();
    rl.on("line", (site) => {
      argv.url = site.trim();

      if (argv.url) {
        console.log(`Start searching on: ${site}`.bgYellow.blue.bold.italic);

        // MAIN FUNCTION START
        scraperController(browserInstance, urlForSearch);

        // CLOSE THE APP
        rl.close();
      } else {
        rl.setPrompt("You should to enter some url. Try again \n");
        rl.prompt();
      }
    });
    // Перейти в начало
  }

  // ADD THE LISTENER ON CLOSE EVENT
  rl.on("close", () => console.log("The end, all mails were found"));
});

// --------------------------

// -0 --- ЗАПУСК ПРИЛОЖЕНИЯ КАК ДОЛЖЕН ВЫГЛЯДЕТЬ?

// 0 --- СТРУКТУРА ПАПОК ЧЕРЕЗ bin/index.js? НЕ нужно прописывать команды в package.json как для запуска веб-приложений?

// 1 --- НУЖНО ЛИ ЗАПИСЫВАТЬ В ФАЙЛ ПОЛУЧЕННЫЕ ЕМЕЙЛЫ???

// 2 --- МОЖНО ЛИ ИСПОЛЬЗОВАТЬ ГОТОВЫЕ РЕШЕНИЯ NPM ПАКЕТЫ, GET-URLS, GET-EMaILS
