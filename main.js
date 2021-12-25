const Discord = require("discord.js");
require("discord-reply"); // Initializing Discord-Reply
const bot = new Discord.Client();

const Tesseract = require("tesseract.js"); // Initializing Tesseract, this module is essential for OCR

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  if (msg.attachments.size > 0) {
    msg.attachments.forEach((attachment) => {
      // Getting the Image URL
      var ImageURL = attachment.proxyURL;

      // Running the image through Tesseract
      Tesseract.recognize(
        ImageURL,
        "eng",
        { logger: (m) => console.log(m) }
      ).then(({ data: { text } }) => {
        // Replying with the extracted test
        console.log(text);
        msg.reply(text);
      });
    });
  }
});
console.log("Working");

bot.login("token");


