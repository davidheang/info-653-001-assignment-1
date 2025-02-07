// install axios cheerio with npm install axios cheerio

const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeWebsite(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const titles = [];
    // loop through all article elements with product_pod class and extract h3 element
    // if you to scrape other site you need to change the class name and the selector
    // since all site are built differently
    $("article.product_pod h3 a").each((index, element) => {
        // push the title attribute of anchor element
      const title = $(element).attr("title");
      titles.push(title);
    });

    console.log("Extracted Titles:", titles);
  } catch (error) {
    //display error message
    console.error("Error fetching the website:", error.message);
  }
}
// use the website you want to scrape in my case it is books.toscrape.com
const websiteUrl = "https://books.toscrape.com"; 
scrapeWebsite(websiteUrl);
