"use strict";
const Discord   = require("discord.js");
const client    = new Discord.Client();
const config    = require("./config.json");
const fs        = require('fs');
const commands  = [];
fs.readdirSync("./lib/commands").forEach(file => {
    commands.push(require("./lib/commands/" + file));
});

client.login(config.token);

client.on("ready", () => { 
    client.user.setUsername(config.botName);
    client.user.setActivity(config.activity);
    console.log("Moongourd Bot is ready");
});

client.on("guildCreate", g => {
    if(!config.useWhitelist) return;
    if(whitelist.includes(g.id)) return;
    else g.leave();
});

client.on('message', (message) => {
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    commands.forEach(cmd => {
        if(cmd.command === command) cmd.callback(client, message, args);
    });
});



