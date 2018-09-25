"use strict";
const {superusers} = require("../../config.json");
module.exports = {
    command: "listguilds",
    callback: function(client, message, args){
        if(!superusers.includes(message.author.id)) return;
        const guildNames = client.guilds.map(g=>g.name);
        const guildIds = client.guilds.map(g => g.id);
        let str = "";
        for(let i in guildNames){
            str += guildNames[i] +"\t\t"+ guildIds[i]+"\n";
        }
        return message.channel.send(str);
    }
}