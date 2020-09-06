const Discord = require('discord.js');
const client = new Discord.Client();
const api = require('imageapi.js');
var { token, prefix, clientID } = require('../config.json');
var clientLink = `https://discord.com/api/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=8`;



client.on("ready", () => {
    console.log(`Webby Patch on! URL: ${clientLink}`)
    client.user.setActivity({
        name: "xqcL",
        type: "STREAMING",
        url: "https://www.twitch.tv/xqcow",
    });
});

client.on('message', async message => {
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const cmd = args.shift().toLowerCase();

    if(cmd === 'ping') {
        message.channel.send("Calculating Latency....").then(m =>{
            // The math thingy to calculate the user's ping
              var ping = m.createdTimestamp - message.createdTimestamp;
  
            // Basic embed
              var embed = new Discord.MessageEmbed()
              .setAuthor(`Client Latency / Ping = ${ping}`)

      if(ping > 100) {
                embed.setColor('#e10d0d')
              }

              if(ping < 100) {
                embed.setColor('#48e71d')
              }
           
              m.delete()
             let calM = message.channel.send(embed);

          });
    } else 
    if(cmd === 'avatar') {
      let target = message.mentions.members.first();
      if (!target) {
       message.channel.send(message.author.avatarURL());
      }
      message.channel.send(target.user.avatarURL());
     
    } else 
    if (cmd === 'bot-link') {
       let embed = new Discord.MessageEmbed()
       .setAuthor('Click on me to invite this bot to other servers!', client.user.avatarURL(), clientLink)
       .setColor('#dd00f5')
       message.channel.send(embed);
    } else 
    if (cmd === 'clear') {
      
      let amount = args.splice(0);
      if(isNaN(amount)) return;

      let fetched = await message.channel.messages.fetch( { limit: amount } )
      message.channel.bulkDelete(fetched);
    } else 
    if (cmd === 'meme') {
      let subreddits = [
        "memes",
        "dankmemes",
        "comedyheaven"
      ]
      let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length))]
      
      let img = await api(subreddit)

      const embed = new Discord.MessageEmbed()
      .setTitle(subreddit)
      .setURL(`https://reddit.com/r/${subreddit}`)
      .setImage(img)
      .setColor("RANDOM")

      message.channel.send(embed)
    } else 
    if (cmd === 'reddit') {
      let subreddit = args.splice(0);

      let img = await api(subreddit);

      const embed = new Discord.MessageEmbed()
      .setTitle(img)
      .setURL(`https://reddit.com/r/${subreddit}`)
      .setImage(img)
      .setColor("RANDOM")

      message.channel.send(embed)
    }
});

client.login(token)