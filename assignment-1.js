// install axios cheerio with npm install axios cheerio

const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeWebsite(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const prices = [];

    // loop through all article elements with product_pod class and extract class priduct_price
    // if you to scrape other site you need to change the class name and the selector
    // since all site are built differently
    $("article.product_pod div.product_price p.price_color").each((index, element) => {
      //push the price to the array prices
      const price = $(element).text().trim();
      prices.push(price);
    });
    
    // filter product price
    const cleanedPrices = prices.map(price => price.replace('£', ''));
    // show only product less 30 dollars
    for(let i = 0; i < cleanedPrices.length; i++) {
      if(cleanedPrices[i] < 30){
        console.log(cleanedPrices[i])
      }
    }
  } catch (error) {
    //display error message
    console.error("Error fetching the website:", error.message);
  }
}
// use the website you want to scrape in my case it is books.toscrape.com
const websiteUrl = "https://books.toscrape.com"; 
scrapeWebsite(websiteUrl);
