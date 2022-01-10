const Discord = require("discord.js");
require("discord-reply"); // Initializing Discord-Reply
const bot = new Discord.Client();
const img = require('images-scraper');
const prefix = '-';
var Scraper = require('images-scraper');
bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

const google = new Scraper({
  puppeteer: {
    headless: false,
  },
});
async function execute(message,args){
  const query = args.join(" ")
  if(!query) return message.channel.send('Please enter a search query')
  const results = await google.scrape(query,1)
  message.reply(results[0].url);

}

bot.on("message",message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // if(command === 'ping'){
  //   message.reply("pong");
  // } 
  if(command === 'image') {
    execute(message,args);
  }  
  bot.token("token");
