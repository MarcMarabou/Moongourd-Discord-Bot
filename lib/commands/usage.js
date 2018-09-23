"use strict";
const {prefix} = require('../../config.json');
module.exports = {
    command: "usage",
    callback: function(client, message, args){
        const str = `Instructions coming at a later point in time`;
        return message.channel.send(str);
    }
}