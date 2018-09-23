"use strict";
const {superusers} = require("../../config.json");
module.exports = {
    command: "setactivity",
    callback: function(client, message, args){
        if(!superusers.includes(message.author.id)) return;
        client.user.setActivity(String(args.slice(0, args.length).join(' ')));
		return message.channel.send(`Attempting to set activity to ${args.slice(0,args.length).join(' ')}`);
    }
}