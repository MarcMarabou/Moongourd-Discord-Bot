"use strict";
const {superusers} = require("../../config.json");
module.exports = {
    command: "leaveguild",
    callback: function(client, message, args){
        if(!superusers.includes(message.author.id)) return;
        if (!args.length) return;
        client.guilds.get(args[0]).leave();
		return message.channel.send(`Left server with id ${args[0]}`);
    }
}