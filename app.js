const readline = require("readline");
const program = require("commander");
require("colors");

const browserObject = require("./src/handlers/browser");
const scraperController = require("./src/handlers/page-controller");

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// ----------------commander

// --- COMMANDS
program.command("go").description("Start app");

program.parse(process.argv);

const argv = program.opts();

// --------------------------

// ---------readline processing
const rl = readline.createInterface({
  input: process.stdin, // ввод
  output: process.stdout, // вывод
});

rl.question("Enter url for searching emails: \n".cyan.italic, (site) => {
  argv.url = site.trim();

  if (argv.url) {
    console.log(`Start searching on: ${site}`.bgYellow.blue.bold.italic);

    let urlForSearch = argv.url;

    // MAIN FUNCTION START
    scraperController(browserInstance, urlForSearch, 3);

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

        rl.close();
      } else {
        rl.setPrompt("You should to enter some url. Try again \n");
        rl.prompt();
      }
    });
  }

  // LISTENER ON CLOSE EVENT
  rl.on("close", () => console.log("The end, all mails were found"));
});
